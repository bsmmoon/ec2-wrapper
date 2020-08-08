import React from "react"
import { connect } from "react-redux"

import AWSCredentials from "../components/aws-credentials"
import InstanceCreation from "../components/instance-creation"
import KeyPair from "../components/key-pair"
import Layout from "../components/layout"
import KeyScript from "../components/key-script"
import SEO from "../components/seo"
import SshScript from "../components/ssh-script"

import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

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
          >Step 1. Provide AWS Access Key
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <AWSCredentials />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="1"
          >Step 2. Prepare a Key Pair
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <KeyPair />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="2"
          >Step 3. Prepare a new Ubuntu machine
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <InstanceCreation />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="3"
          >Step 4. Prepare your .pem file
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
            <KeyScript />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="4"
          >Step 5. Prepare your ssh script
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="4">
          <Card.Body>
            <SshScript />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </Layout>
)

export default connect(state => ({
  loading: state.app.loading,
  step: state.app.step,
}))(IndexPage)
