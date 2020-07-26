import React from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"
import {
  setState,
} from "../state/app"

let fileInput
const handleUploadClick = () => {
  fileInput.click()
}

const handleUpload = ({
  dispatch,
  event,
}) => {
  let file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = e.target.result
      dispatch(setState("pem", text))
    }
    reader.readAsText(file)
  }
}

const copyToClipboard = (text) => {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  alert("Copied to Clipboard")
}

const InstanceCreation = ({
  dispatch,
  pem,
}) => (
  <div>
    <Form>
      <Form.Group>
        <Button block
          disabled 
        >Create a New Key Pair</Button>
      </Form.Group>
      <Form.Group style={{textAlign: "center"}}>
        or
      </Form.Group>
      <Form.Group>
        <Button block
          onClick={handleUploadClick}
        >Upload a Key Pair (.pem)</Button>
        <input
          type="file"
          style={{display: "none"}}
          ref={input => fileInput = input}
          onChange={(event) => handleUpload({ 
            dispatch,
            event,
          })}
        />
      </Form.Group>
      <Form.Group>
        <div
          style={{fontSize: 7, fontStyle: "italic"}}
          onClick={() => copyToClipboard(pem)}
        >{pem}</div>
      </Form.Group>
    </Form>
    <h3>What's happening?</h3>
    <code>
      {"AWS.Resource.signin(abc@gmail.com, *****)"}
      <br/>
      {"AWS.Resource.create(type: \"instance\")"}
    </code>
  </div>
)

export default connect(state => ({
  pem: state.app.pem
}), null) (InstanceCreation)
