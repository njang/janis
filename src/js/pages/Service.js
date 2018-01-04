import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import { parse } from 'query-string';

import ContentItems from 'components/layout/ContentItems';
import Contact from 'components/layout/Contact';
import RelatedLinks from 'components/layout/RelatedLinks';
import FormFeedback from 'components/layout/FormFeedback';
import Service311 from 'components/layout/Service311';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';

import jsonFileData from '__tmpdata/services';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
   // Using React Router, we need to fetch new data when we switch between
   // routes that use the same component but that have different url params.
   // https://github.com/ReactTraining/react-router/blob/c865bc6b331eabd853641dcc7e0224a7dce76f3b/docs/guides/ComponentLifecycle.md
   let oldId = prevProps.match.params.id
   let newId = this.props.match.params.id
   if (newId !== oldId)
     this.fetchData()
 }

  fetchData = () => {
    if (process.env.NODE_ENV !== 'production') {
      // Allow querystrings to set data, which is used in joplin for livepreview
      const query = parse(this.props.location.search);
      if (query.preview) {
        const data = JSON.parse(query.d);
        this.setState({ data: data });
        return;
      }
    }

    const queryBody = `{
      preview(pk: ${this.props.match.params.id}, showPreview: false) {
        id
        title
        slug
        topic {
          id
          text
        }
        content
        extraContent
        contacts {
          edges {
            node {
              contact {
                name
                email
                phone
                hours {
                  edges {
                    node {
                      dayOfWeek
                      startTime
                      endTime
                    }
                  }
                }
                location {
                  name
                  street
                  city
                  state
                  zip
                  country
                }
              }
            }
          }
        }
      }
    }`;

    axios
      .post(`${process.env.REACT_APP_CMS_ENDPOINT}/graphql/`, {
        query: queryBody,
      })
      .then(res => {
        this.setState({ data: res.data.data.preview });
      })
      .catch(err => console.log(err))
  }

  cleanContact(contact) {
    let cleaned = Object.assign(contact);
    cleaned.hours = contact.hours.edges.map((d) => d.node);
    return cleaned;
  }

  render() {
    const { data } = this.state;

    const topicId = get(data, "topic.id", null);
    const topicName = get(data, "topic.text", null);
    const title = get(data, "title", null);
    const steps = get(data, "content", null);
    const contentItems = get(data, "extraContent", null);
    const contacts = get(data, "contacts.edges", []).map((n) => this.cleanContact(n.node.contact));
    const relatedlinks = get(jsonFileData, "servicesRelated", null);
    const services311 = get(jsonFileData, "services311", null);

    return (

      <div>

        <div className="wrapper">
          <div className="coa-main__hero--small"></div>
        </div>

        <div className="wrapper">
          <div className="row">
            <div className="coa-main__left col-xs-12 col-lg-8">

              <div className="coa-section">
                { topicId && ( <a className="coa-main__breadcrumb" href={`/services/topic/${topicId}`}>{topicName}</a> )}
                <h2 className="coa-main__title">{title}</h2>
                { steps && ( <div className="coa-main__steps"><HtmlFromAdmin content={steps} /></div> )}
              </div>

              <ContentItems contentItems={contentItems} />

            </div>

            <div className="coa-main__right col-xs-12 col-lg-4">

              <Contact contacts={contacts} />

            </div>
          </div>
        </div>

        <RelatedLinks relatedlinks={relatedlinks} topicId={topicId} topicName={topicName} />

        <div className="coa-section coa-section--lightgrey">
          <div className="wrapper">
            <FormFeedback />
            <a className="coa-section__link" href="#">Return to Top</a>
          </div>
        </div>

        <Service311 services311={services311} />

      </div>
    );
  }

}

export default Service;
