import React from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"
import {
  setState,
} from "../state/app"

import {
  createInstance,
  findInstances,
  tagInstance,
} from "../helpers/aws-instance-helper"
import { createSshSecurityGroup } from "../helpers/aws-security-group-helper"

const onClickCreateInstance = ({
  dispatch,
  instanceName,
}) => {
  createSshSecurityGroup({ name: instanceName, callbacks: {
    then: () => {
      createInstance({
        params: {
          SecurityGroups: [ instanceName ],
        },
        callbacks: {
          then: (data) => {
            let instance = data.Reservations[0].Instances[0]
            dispatch(setState("instanceId", instance.InstanceId))
            dispatch(setState("publicDnsName", instance.PublicDnsName))

            tagInstance({
              instanceId: instance.InstanceId,
              tags: [{ Key: "Name", Value: instanceName }],
              callbacks: {
                then: (data) => {
                  setTimeout(() => {
                    dispatch(setState("step", "KeyScript"))
                  }, 1000)
                },
                catch: (err) => alert(err.message) 
              }
            })
            
          },
          catch: (err) => alert(err.message)
        }
      })
    },
    catch: (err) => alert(err.message)
  }})
}

const onClickFindInstances = ({
  dispatch,
}) => {
  findInstances({
    callbacks: {
      then: (data) => {
        data = data.Reservations
          .map((reservation) => {
            let instance = reservation.Instances[0]
            let nameTag = instance.Tags.filter((e) => !!e && e.Key === "Name")[0]
            return {
              InstanceName: !nameTag ? "(no name)" : nameTag.Value,
              InstanceId: instance.InstanceId,
              PublicDnsName: instance.PublicDnsName,
              LaunchTime: instance.LaunchTime,
            }
          })
        dispatch(setState("instances", data))
      },
      catch: (err) => alert(err.message)
    }
  })
}

const InstanceCreation = ({
  dispatch,
  publicDnsName,
  instanceId,
  instances,
  instanceName,
  selectedPublicDnsName,
}) => (
  <div>
    <Form>
      <Form.Group>
        <Button block
          onClick={() => onClickFindInstances({
            dispatch
          })}
        >Find Existing Instances</Button>
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
                    instance.InstanceName,
                    instance.PublicDnsName,
                    instance.InstanceId,
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
        <Form.Control
          type="text"
          placeholder="Enter name"
          onChange={(event) => dispatch(setState("instanceName", event.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Button block
          disabled={!instanceName}
          onClick={() => onClickCreateInstance({
            dispatch,
            instanceName,
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
  instanceName: state.app.instanceName, 
  instances: state.app.instances,
  selectedPublicDnsName: state.app.selectedPublicDnsName,
}), null) (InstanceCreation)
