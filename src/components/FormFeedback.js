import React, { Component } from "react";

class FormFeedback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
    };
  }

  setStage = (stage) => {
    this.setState({
      stage: stage
    })
  }

  handleFieldChange = (e) => {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    //TODO: post data as needed
    // after successful form submit
    this.setStage(0);
    //TODO: clear form
  }

  render() {
    return (
      <form className="usa-form">
        <h4 className="coa-section__title">Send us feedback on this page or city services.</h4>

      { (this.state.stage === 0 || this.state.stage === 1) && (

        <div>
          <p className="usa-content">Prefer to talk to a person at 311? Call <a className="nowrap" href="tel:512-974-2000">512-974-2000</a>. </p>
          <fieldset className="usa-fieldset-inputs usa-sans">
            <legend className="usa-sr-only">Site Feedback Options</legend>
            <ul className="usa-unstyled-list">
              <li>
                <input
                  id="page-content"
                  type="radio"
                  name="site-feedback-options"
                  value="page-content"
                  checked={this.state["site-feedback-options"] === "page-content"}
                  onChange={this.handleFieldChange}
                />
                <label for="page-content">Information on this page</label>
              </li>
              <li>
                <input
                  id="translation"
                  type="radio"
                  name="site-feedback-options"
                  value="translation"
                  checked={this.state["site-feedback-options"] === "translation"}
                  onChange={this.handleFieldChange}
                />
                <label for="translation">Language Translation</label>
              </li>
              <li>
                <input
                  id="technical-issue"
                  type="radio"
                  name="site-feedback-options"
                  value="technical-issue"
                  checked={this.state["site-feedback-options"] === "technical-issue"}
                  onChange={this.handleFieldChange}
                />
                <label for="technical-issue">Technical Issue</label>
              </li>
              <li>
                <input
                  id="other"
                  type="radio"
                  name="site-feedback-options"
                  value="other"
                  checked={this.state["site-feedback-options"] === "other"}
                  onChange={this.handleFieldChange}
                />
                <label for="other">Something else</label>
              </li>
            </ul>
          </fieldset>
          <button className="usa-button" onClick={(e)=>this.setStage(2)}>Continue</button>
        </div>

      )}

      { this.state.stage === 2 && (

        <div>
          <p className="usa-content">Your feedback will be public and can be found at <a className="nowrap" href="#">austin.gov feedback tracker</a>.</p>
          <fieldset>
            <div className="coa-form_field__helpertext_sub">required</div>
            <label className="usa-sr-only" for="site-feedback-textarea">Tell Us More</label>
            <textarea
              id="site-feedback-textarea"
              name="site-feedback-textarea"
              placeholder="Tell Us More"
              onChange={this.handleFieldChange}
            >{this.state["site-feedback-textarea"]}</textarea>
          </fieldset>

          <p className="usa-content coa-form_field__helpertext_main">Type your email in the box if you would like to receive a link to your feedback.</p>
          <fieldset>
            <div className="coa-form_field__helpertext_sub">required</div>
            <label className="usa-sr-only" for="site-feedback-email">Email</label>
            <input
              id="site-feedback-email"
              name="site-feedback-email"
              type="text"
              placeholder="someemail@gmail.com"
              onChange={this.handleFieldChange}
            />
          </fieldset>

          <input type="submit" value="Submit" onClick={this.handleFormSubmit} />
          <button className="usa-button-secondary" onClick={(e)=>this.setStage(1)}>Cancel</button>
        </div>
      )}

      { this.state.stage === 0 && (
        <div className="coa-overlay">
          <div className="coa-overlay__content">
            <h4>Thank you for sharing your feedback!</h4>
            <p>You can see your feedback in our <a href="#">austin.gov feedback tracker</a></p>
            <button className="usa-button" onClick={(e)=>this.setStage(1)}>Done</button>
          </div>
        </div>
      )}

      </form>
    );
  }

}

export default FormFeedback;
