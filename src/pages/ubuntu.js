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
            eventKey="AWSCredentials"
          >Step 1. Provide AWS Access Key
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="AWSCredentials">
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
            eventKey="KeyPair"
          >Step 2. Prepare a Key Pair
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="KeyPair">
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
            eventKey="InstanceCreation"
          >Step 3. Prepare an Ubuntu machine
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="InstanceCreation">
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
            eventKey="KeyScript"
          >Step 4. Prepare your .pem file
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="KeyScript">
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
            eventKey="SshScript"
          >Step 5. Prepare your ssh script
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="SshScript">
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
