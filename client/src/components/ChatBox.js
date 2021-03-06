import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import ChatIcon from '@material-ui/icons/Chat'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'


class ChatBox extends Component {

  state={
    textFieldValue: '',
  }

  emitMsg(e){
    e.preventDefault();
    actions.emitMsg(this.state.textFieldValue, this.props.user.username);
    this.setState({textFieldValue: ''});
  }

  canJoinChat(){
    if(this.props.auth.user.user){}
  }

  renderMsgs(){
    let listItems;
    if(this.props.chat.msgs.length > 0 ){
      listItems = this.props.chat.msgs.map((msg, index)=>{
        return (
          <div key={index}>
            <Typography variant="body1" style={{color:'black'}}>
              {msg}
            </Typography>
            <hr style={{width: '85%', borderColor: '#4b4c441a', borderBottomWidth: '0px'}} />
          </div>
        )
      });
      return(
        <div>
          {listItems}
        </div>
      )
    }
  }

  renderButtonOrChat(){
    if(this.props.ui.chat){
      return(
        <div style={{border:'1px solid black', width:'fit-content',backgroundColor: 'white', zIndex:1202, height:'fit-content', position:'relative'}}>
          <div className="handle cardHeader" style={{display:'flex'}}>
            <Typography variant="body1" >
              Drag me !
            </Typography>
            <div style={{marginLeft:'auto'}}> 
              <CloseIcon onClick={()=> this.props.closeChat()}></CloseIcon>
            </div>
          </div>
          <div>
            {this.renderMsgs()}
          </div>
          <form onSubmit={(e)=> this.emitMsg(e)}>
            <Button variant="outlined" color="primary" onClick={(e) => this.emitMsg(e)}>Send msg chat</Button>
            <TextField label="Type your message...." 
              placeholder="Message...."
              value={this.state.textFieldValue}
              onChange={this.handleTextFieldChange.bind(this)}
              onSubmit={()=> this.emitMsg()}
              style={{color:'black'}}
              InputProps={{
                style: {
                  color:'black'
                }
              }}
              InputLabelProps={{
                style: {
                  color:'black'
                }
              }}
            >
              {this.state.textFieldValue}
            </TextField>
          </form>
        </div>
      )
    }else{
      return(
        <Button className="handle" onClick={()=> this.props.openChat()} 
          variant="fab" size="medium" color="primary" 
          style={{backgroundColor: '#f50057'}} aria-label="chat"
        >
          <ChatIcon />
        </Button>
      )
    }
  }

  async handleTextFieldChange(e){
    await this.setState({
      textFieldValue: e.target.value
    });
  }

  render() {

    return (
      <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      position={null}
      grid={[25, 25]}
      onStart={this.handleStart}
      onDrag={this.handleDrag}
      onStop={this.handleStop}
      bounds="body"
      >
      <div style={{ width:'fit-content',backgroundColor: 'tansparent', zIndex:1202, height:'fit-content', position:'absolute',bottom:'10px',right:'10px'}}>
          {this.renderButtonOrChat()}
      </div>
      </Draggable>
    );
  }
}

function mapStateToProps({auth,chat,ui}){
  return {
    user: auth.user.user,
    chat: chat,
    ui: ui
  }
}

export default connect(mapStateToProps, actions)(ChatBox);