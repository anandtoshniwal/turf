import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import momentPlugin from "@fullcalendar/moment";
import moment from "moment";
import base, { db } from "../rebase";
import UpdateForm from "./updateForm";
import Tooltip from "tooltip.js";

import "../styles.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export default class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    weekends: true,
    events: []
  };

  componentDidMount() {
    base.bindCollection("events", {
      context: this,
      state: "events",
      withRefs: true,
      withIds: true
      // add here some query to filter the collection
      //  (https://www.npmjs.com/package/re-base#bindcollectionreforpath-options)
    });
  }

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          &nbsp; (also, click a date/time to add an event)
        </div>
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="timeGridWeek"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[
              momentPlugin,
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin
            ]}
            eventRender={this.eventRender}
            ref={this.calendarComponentRef}
            weekends={this.state.weekends}
            events={this.state.events}
            // selectMirror={true}
            select={this.handleSelect}
            nowIndicator={true}
            eventResize={this.handleResize}
            eventDrop={this.handleMove}
            eventClick={this.handleEventClick}
            // dateClick={this.handleDateClick}
            locale="en"
            editable={true} // to enable dragging and resizing
            selectable={true}
            slotEventOverlap={false}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}
          />
          <UpdateForm collection={this.state.events} />
        </div>
      </div>
    );
  }

  eventRender(info) {
    const tooltip = `${info.event.title} met ${info.event.extendedProps.provider}`;
    new Tooltip(info.el, {
      title: tooltip,
      placement: "top",
      trigger: "hover",
      container: "body"
    });
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      weekends: !this.state.weekends
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  };

  // demo : adding a event after clicking on the schedule

  handleSelect = (arg) => {
    console.log("handleSelect: ", arg);
    if (
      window.confirm("Would you like to add an event to " + arg.start + " ?")
    ) {
      const start = new Date(arg.startStr).toISOString();
      const end = moment(start).add(1, "hours").toISOString();
      // console.log("start=", start, "end=", end);

      base
        .addToCollection("events", {
          start: start,
          end: end,
          title: "oppas2",
          description: "some longer description",
          nameAssistant: "nameAssistant",
          nameClient: "nameClient",
          filterField: "abc",
          color: "blue",
          editable: true,
          className: "activity",

          constraint: "available"
        })
        .then(() => {
          console.log("success!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleDateClick = (arg) => {
    console.log("handleDateClick=", arg);
  };

  handleResize = (arg) => {
    // console.log(arg.event.end.toISOString());
    db.collection("events")
      .doc(arg.event._def.publicId)
      .update({ end: arg.event.end.toISOString() });
  };

  // sample use of eventClick
  // (careful: doesn't work on a background event, only works when you click on an event)
  // part of the object returned is an anchor to the html element clicked
  // as well as all of the event info. So interesting to handle existing events
  // ... but how trigger a click on a background event that is not overlapped by a 'normal' event

  handleEventClick = (eventClickInfo) => {
    console.log("handleEventClick: ", eventClickInfo);
  };

  handleMove = (arg) => {
    db.collection("events").doc(arg.event._def.publicId).update({
      start: arg.event.start.toISOString(),
      end: arg.event.end.toISOString()
    });
  };
} // end of class
