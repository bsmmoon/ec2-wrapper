import React from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"
import {
  setState,
} from "../state/app"

import AWS from "aws-sdk"

const script = (publicDnsName, keyPath) => {
  return `ssh -i ${keyPath} ubuntu@${publicDnsName}`
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
  publicDnsName,
}) => (
  <div>
    <Form>
      <Form.Group>
        <div
          style={{ fontStyle: "italic" }}
          onClick={() => copyToClipboard(script(publicDnsName, "key.pem"))}
        >
          <br />
          {script(publicDnsName, "key.pem")}
          <br />
        </div>
      </Form.Group>
    </Form>
  </div>
)

export default connect(state => ({
  publicDnsName: state.app.publicDnsName,
}), null) (PemFile)