import React from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"
import {
  setState,
} from "../state/app"

const script = (pem) => {
  return `echo "${pem}" >> key.pem`
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

const PemFile = ({
  dispatch,
  pem,
}) => (
  <div>
    <Form>
      <Form.Group>
        <div
          style={{fontSize: 7, fontStyle: "italic"}}
          onClick={() => copyToClipboard(script(pem))}
          onKeyDown={() => copyToClipboard(script(pem))}
        >{script(pem)}</div>
      </Form.Group>
    </Form>
    <Form>
      <Form.Group>
        <Button block
          onClick={() => dispatch(setState("step", "4"))}
        >Next</Button>
      </Form.Group>
    </Form>
  </div>
)

export default connect(state => ({
  pem: state.app.pem,
}), null) (PemFile)
