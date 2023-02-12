import React, { Component } from "react";
import base from "../rebase";

class updateForm extends Component {
  // state is used to make the create and update CONTROLLED forms
  state = {
    u_start: "",
    u_end: "",
    u_title: "",
    u_ref: null,
    showUpdateForm: false
  };

  //  Generic handler to keep in state every keystroke in the forms

  handleFormFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // the C of CRUD: this creates a new document in the Firestore collection= 'collection'
  // adding the id through UUID is probably redundant with Firestore creating an autoId anyways

  // handleCreate = event => {
  //   event.preventDefault();
  //   base
  //     .addToCollection("events", {
  //       start: this.state.c_field1,
  //       field2: this.state.c_field2
  //     })
  //     .then(() => {
  //       console.log('success!')
  //     })
  //     .catch(err => {
  //       //handle error
  //     });
  //   this.setState({ c_field1: "", c_field2: "" });
  // };

  // Next function initializes the update form

  handleStartUpdate = record => {
    this.setState({ showUpdateForm: true });
    this.setState({
      u_start: record.start,
      u_end: record.end,
      u_title: record.title,
      u_ref: record.ref
    });
  };

  // The U part of CRUD: updating a document in Firestore

  handleUpdate = () => {
    const updatedDoc = {
      start: this.state.u_start,
      end: this.state.u_end,
      title: this.state.u_title
    };
    base.updateDoc(this.state.u_ref, updatedDoc);
    this.setState({ showUpdateForm: false });
  };

  render() {
    const collectionJSX =
      this.props.collection &&
      this.props.collection.map(record => {
        return (
          <div key={record.id}>
            <li>
              {record.start} <br /> {record.end} <br /> {record.title} <br />
              {/* this is the D part of CRUD: it sends a delete-document request to Firestore */}
              <button
                onClick={() => base.removeDoc(record.ref)}
                style={{ border: "solid red 2px", margin: "6px" }}
              >
                delete
              </button>
              <button
                onClick={() => this.handleStartUpdate(record)}
                style={{ border: "solid green 2px", margin: "6px" }}
              >
                update
              </button>
            </li>
          </div>
        );
      });
    return (
      <div>
        <h1>Demo CRUD react / firestore</h1>


        <ol style={{ border: "solid green 2px", margin: "6px" }}>
          {collectionJSX}
        </ol>
        {/* end of collection display */}

        {/* start of update form */}

        {this.state.showUpdateForm ? (
          <div style={{ border: "solid red 2px", margin: "6px" }}>
            <p>Update existing record form:</p>
            <input
              type="text"
              name="u_start"
              placeholder="start"
              onChange={this.handleFormFieldChange}
              value={this.state.u_start}
              style={{ margin: "6px" }}
            />
            <br />
            <input
              type="text"
              name="u_end"
              placeholder="end"
              onChange={this.handleFormFieldChange}
              value={this.state.u_end}
              style={{ margin: "6px" }}
            />
            <br />
            <input
              type="text"
              name="u_title"
              placeholder="title"
              onChange={this.handleFormFieldChange}
              value={this.state.u_title}
              style={{ margin: "6px" }}
            />
            <br />
            <button onClick={this.handleUpdate} style={{ margin: "6px" }}>
              update record
            </button>
          </div>
        ) : (
          <p>no update happening now</p>
        )}

        {/* end of update form */}
      </div>
    );
  }
}

export default updateForm;
