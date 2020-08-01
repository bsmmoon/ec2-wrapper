import React from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"
import {
  setState,
} from "../state/app"

import AWS from "aws-sdk"

const createInstance = ({
  dispatch,
}) => {
  let instanceParams = {
    ImageId: "ami-09a4a9ce71ff3f20b",
    InstanceType: "t2.micro",
    KeyName: "ubuntu1",
    MinCount: 1,
    MaxCount: 1,
  }

  let instancePromise = new AWS.EC2().runInstances(instanceParams).promise()

  instancePromise
    .then((data) => {
      dispatch(setState("cache", JSON.stringify(data)))
      let instanceId = data.Instances[0].InstanceId
      dispatch(setState("instanceId", instanceId))
      waitForPublicDns(dispatch, instanceId)
    }).catch((err) => {
      alert(err.stack)
    })
}

const waitForPublicDns = (dispatch, instanceId) => {
  let ec2 = new AWS.EC2()

  let params = {
    InstanceIds: [instanceId],
    DryRun: false
  }

  ec2.describeInstances(params, (err, data) => {
    if (err) {
      alert(err.stack)
    } else {
      let publicDnsName = data.Reservations[0].Instances[0].PublicDnsName
      dispatch(setState("publicDnsName", publicDnsName))
    }
  })
}

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
  publicDnsName,
  instanceId,
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
      <div hidden={!pem}>
        <Form.Group>
          <Button block
            onClick={() => createInstance({
              dispatch
            })}
          >Create Instance</Button>
        </Form.Group>
      </div>
      <Form.Group>
        <div
          style={{fontSize: 10, fontStyle: "italic"}}
          onClick={() => copyToClipboard(instanceId)}
        >{instanceId}</div>
      </Form.Group>
      <Form.Group>
        <div
          style={{fontSize: 10, fontStyle: "italic"}}
          onClick={() => copyToClipboard(publicDnsName)}
        >{publicDnsName}</div>
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
  pem: state.app.pem,
  publicDnsName: state.app.publicDnsName,
  instanceId: state.app.instanceId,
}), null) (InstanceCreation)
