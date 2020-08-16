import React from "react"

import Form from "react-bootstrap/Form"

import { connect } from "react-redux"

const script = (publicDnsName, keyPath) => {
  return `echo "ssh -i ${keyPath} ubuntu@${publicDnsName}" >> start.sh`
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
        Touch to copy. Paste it in your console.
      </Form.Group>
      <Form.Group>
        <div
          style={{ fontStyle: "italic" }}
          onClick={() => copyToClipboard(script(publicDnsName, "key.pem"))}
          onKeyDown={() => copyToClipboard(script(publicDnsName, "key.pem"))}
        >
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
