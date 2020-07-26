import React from "react"
import { connect } from "react-redux"

import { setStep } from "../state/app"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

const onCredentialsSubmit = (dispatch) => {
  // check whether it's valid
  // while being checked, add a spinner
  // on success, go to next step
  dispatch(setStep("1"))
}

const AWSCredentialsForm = (dispatch) => (
  <Form>
    <Form.Group>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button block
      onClick={() => onCredentialsSubmit(dispatch)}
    >Submit</Button>
  </Form>
)

const InstanceCreation = () => (
  <div>
    <h3>What's happening?</h3>
    <code>
      {"AWS.Resource.signin(abc@gmail.com, *****)"}
      <br/>
      {"AWS.Resource.create(type: \"instance\")"}
    </code>
  </div>
)

const IndexPage = ({dispatch, loading, step}) => (
  <Layout>
    <SEO title="Home" />
    <h3>Ubuntu!</h3>

    <Accordion activeKey={step}>
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="0"
          >Step 1. Provide AWS Credentials
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{AWSCredentialsForm(dispatch)}</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="1"
          >Step 2. Instance is being created...
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>{InstanceCreation()}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </Layout>
)

export default connect(state => ({
  loading: state.app.loading,
  step: state.app.step,
}))(IndexPage)
