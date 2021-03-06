import React from "react"
import { connect } from "react-redux"

import { setDebug } from "../state/app"

import Button from "react-bootstrap/Button"

const Debug = ({ dispatch, state }) => (
  <div>
    <Button size="sm" onClick={() => dispatch(setDebug(!state.debug))}>Debug</Button>
    <br/>
    <div hidden={!state.debug} style={{
      fontSize: "8px"
    }}><pre>{ format(state) }</pre></div>
    <br/>
  </div>
)

const format = (state) => {
  return JSON.stringify(state, null, 2)
}

export default connect(state => ({
  state: {
    accessKeyId: state.app.accessKeyId,
    cache: state.app.cache,
    debug: state.app.debug,
    instances: state.app.instances,
    instanceId: state.app.instanceId,
    instanceName: state.app.instanceName,
    loading: state.app.loading,
    publicDnsName: state.app.publicDnsName,
    secretAccessKey: state.app.secretAccessKey,
    selectedPublicDnsName: state.app.selectedPublicDnsName,
    step: state.app.step,
  }
}))(Debug)
