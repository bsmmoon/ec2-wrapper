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
      dispatch(setState("step", "InstanceCreation"))
    }
    reader.readAsText(file)
  }
}

const KeyPair = ({
  dispatch,
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
    </Form>
  </div>
)

export default connect(state => ({
}), null) (KeyPair)
