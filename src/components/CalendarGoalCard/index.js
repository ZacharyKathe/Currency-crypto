import React from "react";
// import API from "../../utils/API";
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Dropdown from "../Dropdown";
// import SliderModal from "../SliderModal/index";
import Moment from "moment";
import "./style.css"
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import AccessibilityNewRoundedIcon from '@material-ui/icons/AccessibilityNewRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';

import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
// import DoneIcon from '@material-ui/icons/Done';
export default function CalendarGoalCard(props) {
 
    // const [open, setOpen] = useState(false);
    // const [clickOpen, setClickOpen] = useState(false);
  
  
    // const handleClick = () => {
    //   setOpen(true);
    // };
  
    // const handleClose = (event, reason) => {
    //   if (reason === 'clickaway') {
    //     return;
    //   }
    //   setOpen(false);
    // };
  
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
    // const setComplete = () => {
    //   const token = localStorage.getItem('token');
    //   API.editGoal(props.id, { goal_progress: props.goal_target, lastUpdate: Moment() }, token).then(res => {
    //     API.getIncompleteGoals(token).then(res => {
    //       props.setUserGoals(res.data.Goals)
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   })
  
    // }
    // This will actually complete the goal, and send it to the completed page, saving its completion date
    // const markComplete = () => {
    //   const token = localStorage.getItem('token');
    //   const completedGoal = {
    //     goal_progress: props.goal_target,
    //     isComplete: true,
    //     lastCompletedDate: Moment().format("YYYY-MM-DD"),
    //   }
  
    //   console.log("CompletedGoal", completedGoal);
    //   API.editGoal(props.id, completedGoal, token).then(res => {
    //     API.getIncompleteGoals(token).then(res => {
    //       props.setUserGoals(res.data.Goals)
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   })
  
      
    // }
  
  
  
    const renderActivityIcon = () => {
      switch (props.goal_category) {
        case "Diet":
          return (<RestaurantRoundedIcon />);
        case "Intellectual":
          return (<SchoolRoundedIcon />);
        case "Exercise":
          return (<DirectionsRunRoundedIcon />);
        case "Financial":
          return (<MonetizationOnRoundedIcon />);
        case "Habit":
          return (<BallotRoundedIcon />);
        case "Health":
          return (<FavoriteRoundedIcon />);
        case "Relationship":
          return (<SupervisedUserCircleRoundedIcon />);
        case "Work":
          return (<WorkRoundedIcon />);
        case "Productivity":
          return (<TrendingUpRoundedIcon />);
        case "Skill":
          return (<BuildRoundedIcon />);
        default: return (<AccessibilityNewRoundedIcon />);
      }
    }
  
    console.log("Moment", Moment().format("YYYY-MM-DD"))
  
    const percent = ((props.goal_progress / props.goal_target) * 100)
    const pctComplete = percent.toFixed(2)
  
    return (
      // <Draggable
      // axis="x"
      // handle=".handle"
      // defaultPosition={{x: 0, y: 0}}
      // position={null}
      // grid={[25, 25]}
      // scale={1}
      // onStart={this.handleStart}
      // onDrag={this.handleDrag}
      // onStop={this.handleStop}>
      <div className={!props.is_complete ? 'containerZK' : 'containerZK containerComplete'}>
        <div className={!props.is_complete ? 'card bt-card' : 'card bt-card containerComplete'}>
          <div className="content">
            <h3 className='goalheading'>{props.goal_name}</h3>
            {/* This opens up a dropdown for editing, completing, and deleting goal */}
            
          </div>
  
          <div className="middle-content">
            <div className='contentRight'>
              <p className='goalInfo'>
                {renderActivityIcon()} {props.goal_category}
              </p>
              <p className='endDate'> <UpdateRoundedIcon /> {props.goal_target} {props.value_type !== "Other" ? (props.goal_target === 1 ? props.value_type.toLowerCase().substring(0, props.value_type.length - 1) : props.value_type.toLowerCase()) : (props.goal_type === 1 ? "time" : "times")} {props.goal_frequency.toLowerCase()} until {Moment(props.goal_finish).format("MMMM Do")}</p>
            </div>
            <div className='contentLeft'>
              {!props.is_complete ? checkComplete() : ""}
            </div>
          </div>
          {/* This is where the label would go for above */}
          {/* <div className="progress-label">{props.is_complete ? props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type.toLowerCase()} completed on ${Moment(props.completed_date).format("MMMM Do, YYYY")}!` : props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type.toLowerCase()} completed ${renderFrequency()}!`}</div> */}
          <div className="bigCont">
            <div className="progCont">
              {props.is_complete ?
                <ProgressBar now={pctComplete} label={props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type.toLowerCase()} completed on ${Moment(props.completed_date).format("MMMM Do, YYYY")}!`} />
                : <ProgressBar now={pctComplete} label={props.value_type === "Event" || props.value_type === "Other" || !props.value_type ? `${props.goal_progress} out of ${props.goal_target} completed!` : `${props.goal_progress} out of ${props.goal_target} ${props.value_type.toLowerCase()} completed ${renderFrequency()}!`} />}
            </div>
          </div>
        </div>
      </div>
      // </Draggable>
    );
  }

