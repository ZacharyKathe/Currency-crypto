import React, { useState } from "react";
import API from "../../utils/API";
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from "../Dropdown";
import SliderModal from "../SliderModal/index";
import Moment from "moment";
import "./style.css"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import renderActivityIcon from "../renderCategoryIcon"
// import CheckIcon from '@material-ui/icons/Check';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
// import DoneIcon from '@material-ui/icons/Done';

function DashboardCard(props) {

  const [open, setOpen] = useState(false);
  // const [clickOpen, setClickOpen] = useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const renderFrequency = () => {
    switch (props.goal_frequency) {
      case "Daily":
        return "today";
      case "Weekly":
        return "this week";
      case "Monthly":
        return "this month";
      default: return "so far"
    }
  }

  const renderValueType = () => {
    switch (props.value_type) {
      case "Other":
        return "";
      case "Events":
        return "events";
      default: return (props.value_type.toLowerCase())
    }
  }

  const checkComplete = () => {
    // const token = localStorage.getItem('token');
    if (props.goal_progress === 0) {
      return (
        <Tooltip 
          title="Start Them Gains Doge. Click + Btn to Add Progress!"
          placement="right-start"
        >
        <Chip
          label="Let's Get Started!"
        />
        </Tooltip>
      )
    }
    if (props.goal_target === props.goal_progress) {
      return (
        <Tooltip 
          title="Click Check Btn to Save!"
          placement="right-start"
        >
        <Chip
          label="Goal Complete!"
          style={{
            backgroundColor: "#b8ffa9",
            color: "black"
          }}
        />
        </Tooltip>
      )
    } else return (
      <Tooltip 
        title="Oh Yeah! Nice! Click + Btn to Add Progress!"
        placement="right-start"
        >
      <Chip
        label="Keep it up!"
        style={{
          backgroundColor: "#fff3cd",
          color: "black"
        }}
      />
      </Tooltip>
    )
  }

  // Just sets the progress to target goal
  const setComplete = () => {
    const token = localStorage.getItem('token');
    API.editGoal(props.id, { goal_progress: props.goal_target, lastUpdate: Moment() }, token).then(res => {
      API.getIncompleteGoals(token).then(res => {
        props.setUserGoals(res.data.Goals)
      }).catch(err => {
        console.log(err);
      })
    })

  }
  // This will actually complete the goal, and send it to the completed page, saving its completion date
  const markComplete = () => {
    const token = localStorage.getItem('token');
    const completedGoal = {
      goal_progress: props.goal_target,
      isComplete: true,
      lastCompletedDate: Moment().format("YYYY-MM-DD"),
    }

    console.log("CompletedGoal", completedGoal);
    API.editGoal(props.id, completedGoal, token).then(res => {
      API.getIncompleteGoals(token).then(res => {
        props.setUserGoals(res.data.Goals)
      }).catch(err => {
        console.log(err);
      })
    })

    
  }


  const percent = ((props.goal_progress / props.goal_target) * 100)
  const pctComplete = percent.toFixed(0)

  return (

    <div className={!props.is_complete ? 'containerZK' : 'containerZK containerComplete'}>
      <div className={!props.is_complete ? 'card bt-card' : 'card bt-card containerComplete'}>
        <div className="content">
          <h3 className='goalheading'>{props.goal_name}</h3>
          {/* This opens up a dropdown for editing, completing, and deleting goal */}
          <Dropdown
            style={{
              color: "#a0c4ff"
            }}
            goal_id={props.id}
            token={props.token}
            goal_name={props.goal_name}
            goal_description={props.goal_description}
            goal_target={props.goal_target}
            goal_progress={props.goal_progress}
            goal_category={props.goal_category}
            goal_frequency={props.goal_frequency}
            goal_start={props.goal_start}
            goal_finish={props.goal_finish}
            value_type={props.value_type}
            cheers={props.cheers}
            is_complete={props.is_complete}
            completed_date={props.completed_date}
            last_refresh={props.last_refresh}
            setUserGoals={props.setUserGoals}
            markComplete={markComplete}
            setComplete={setComplete}
          />
        </div>

        <div className="middle-content">
          <div className='contentRight'>
            <p className='goalInfo'>
              {renderActivityIcon(props.goal_category)} {props.goal_category}
            </p>
            <p className='endDate'> <UpdateRoundedIcon /> {props.goal_target} {props.value_type !== "Other" ? (props.goal_target === 1 ? props.value_type.toLowerCase().substring(0, props.value_type.length - 1) : props.value_type.toLowerCase()) : (props.goal_type === 1 ? "time" : "times")} {props.goal_frequency.toLowerCase()} until {Moment(props.goal_finish).format("MMMM Do")}</p>
          </div>
          <div className='contentLeft'>
            {!props.is_complete ? checkComplete() : ""}
          </div>
        </div>
        {/* This is where the label would go for above */}
        <p className="progress-label">{!props.is_complete ? `${props.goal_progress} out of ${props.goal_target} ${renderValueType()} completed ${renderFrequency()}!` : ``}</p>
        <div className="bigCont">
          <div className="sliderCont">
            {!props.is_complete ? <><SliderModal
              goal_target={props.goal_target}
              goal_progress={props.goal_progress}
              goal_id={props.id}
              token={props.token}
              setUserGoals={props.setUserGoals}
              handleClick={handleClick}
            /></> : ""}
          </div>
          <div className="progCont">
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              message="Progress Saved"
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
              <ProgressBar now={pctComplete} label={`${pctComplete}%`} />
          </div>
        </div>
      </div>
    </div>
    // </Draggable>
  );
}

export default DashboardCard;
