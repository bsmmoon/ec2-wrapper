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

  let interval = setInterval(() => waitForPublicDnsName(), 1000)

  let seconds = 0

  const waitForPublicDnsName = () => { 
    ec2.describeInstances(params, (err, data) => {
      if (err) {
        throw err
      } else {
        let publicDnsName = data.Reservations[0].Instances[0].PublicDnsName
        if (!!publicDnsName) {
          dispatch(setState("publicDnsName", publicDnsName))
          dispatch(setState("step", "KeyScript"))
          clearInterval(interval)
        } else {
          dispatch(setState("publicDnsName", seconds++))
        }
      }
    })
  }
}

const fetchInstances = ({
  dispatch,
  options
}) => {
  let ec2 = new AWS.EC2()

  let params = {
    ...options,
    DryRun: false
  }

  ec2.describeInstances(params, (err, data) => {
    if (err) {
      throw err
    } else {
      data = data.Reservations
        .map((reservation) => {
          let instance = reservation.Instances[0]
          return {
            InstanceId: instance.InstanceId,
            PublicDnsName: instance.PublicDnsName,
            LaunchTime: instance.LaunchTime,
            KeyName: instance.KeyName,
          }
        })
      dispatch(setState("instances", data))
    }
  })
}

const InstanceCreation = ({
  dispatch,
  publicDnsName,
  instanceId,
  instances,
  selectedPublicDnsName,
}) => (
  <div>
    <Form>
      <Form.Group>
        <Button block
          onClick={() => fetchInstances({
            dispatch,
          })}
        >Fetch Existing Instances</Button>
      </Form.Group>
      <Form.Group hidden={instances.length === 0}>
        <Form.Control
          as="select"i
          onChange={(event) => dispatch(setState("selectedPublicDnsName", event.target.value))}
        >
          <option selected disabled>Select an instance</option>
          {
            instances
              .filter((instance) => !!instance.PublicDnsName)
              .map((instance) => <option key={instance.PublicDnsName}
                value={instance.PublicDnsName}>
                  {[
                    instance.PublicDnsName,
                    instance.InstanceId,
                    instance.KeyName,
                    instance.LaunchTime.toLocaleString(),
                  ].join(", ")}
                </option>
              )
          }
        </Form.Control>
      </Form.Group>
      <Form.Group hidden={!selectedPublicDnsName}>
        <Button block
          onClick={() => {
            dispatch(setState("publicDnsName", selectedPublicDnsName))
            dispatch(setState("step", "KeyScript"))
          }}
        >Select Instance</Button>
      </Form.Group>
      <Form.Group>
        or
      </Form.Group>
      <Form.Group>
        <Button block
          onClick={() => createInstance({
            dispatch
          })}
        >Create Instance</Button>
      </Form.Group>
      <Form.Group>
        <div
          style={{fontSize: 10, fontStyle: "italic"}}
          hidden={!instanceId}
        >Instance ID: {instanceId}</div>
      </Form.Group>
      <Form.Group>
        <div
          style={{fontSize: 10, fontStyle: "italic"}}
          hidden={!publicDnsName}
        >Public DNS Name: {publicDnsName}</div>
      </Form.Group>
    </Form>
  </div>
)

export default connect(state => ({
  pem: state.app.pem,
  publicDnsName: state.app.publicDnsName,
  instanceId: state.app.instanceId,
  instances: state.app.instances,
  selectedPublicDnsName: state.app.selectedPublicDnsName,
}), null) (InstanceCreation)
