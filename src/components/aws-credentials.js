import React from "react"

import { connect } from "react-redux"
import {
  setState,
} from "../state/app"

import AWS from "aws-sdk"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const REGION = "ap-southeast-1"

const onSubmit = ({
  dispatch,
  accessKeyId,
  secretAccessKey,
  step,
}) => {
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region: REGION,
  })

  let ec2 = new AWS.EC2()

  let params = {
    DryRun: false
  }

  ec2.describeInstances(params, (err, data) => {
    if (err) {
      alert(err.stack)
    } else {
      // alert(`SUCCESS ${JSON.stringify(data)}`)
    }
  })

  AWS.config.getCredentials((err) => {
    if (err) {
      alert(err.stack)
    } else {
      // alert(`Access key: ${AWS.config.credentials.accessKeyId}`)
      dispatch(setState("step", "1"))
    }
  })
}

const AWSCredentials = ({
  dispatch,
  accessKeyId,
  secretAccessKey,
  step,
}) => (
  <Form>
    <Form.Group>
      <Form.Control
        type="id"
        placeholder="Access Key ID"
        onChange={(event) => dispatch(setState("accessKeyId", event.target.value))}
      />
    </Form.Group>
    <Form.Group>
      <Form.Control
        type="password"
        placeholder="Secret Access Key"
        onChange={(event) => dispatch(setState("secretAccessKey", event.target.value))}
      />
    </Form.Group>
    <Button block
      onClick={() => onSubmit({
        dispatch,
        accessKeyId,
        secretAccessKey,
        step,
      })}
    >Submit</Button>
  </Form>
)

export default connect(state => ({
  accessKeyId: state.app.accessKeyId,
  secretAccessKey: state.app.secretAccessKey,
  step: state.app.step,
}), null) (AWSCredentials)
