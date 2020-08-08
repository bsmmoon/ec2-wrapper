import React from "react"
import { connect } from "react-redux"

import { setDebug } from "../state/app"

import Button from "react-bootstrap/Button"

const Debug = ({ dispatch, state }) => (
  <div>
    <Button size="sm" onClick={() => dispatch(setDebug(!state.debug))}>Debug</Button>
    <br/>
    <div hidden={!state.debug}>
      {
        JSON.stringify(state)
      }
    </div>
    <br/>
  </div>
)

export default connect(state => ({
  state: {
    accessKeyId: state.app.accessKeyId,
    cache: state.app.cache,
    debug: state.app.debug,
    instances: state.app.instances,
    instanceId: state.app.instanceId,
    loading: state.app.loading,
    publicDnsName: state.app.publicDnsName,
    secretAccessKey: state.app.secretAccessKey,
    step: state.app.step,
  }
}))(Debug)
