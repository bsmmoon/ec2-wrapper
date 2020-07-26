import React from "react"
import { connect } from "react-redux"

import AWSCredentials from "../components/aws-credentials"
import InstanceCreation from "../components/instance-creation"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
          >Step 2. Prepare a new Ubuntu machine
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <InstanceCreation />
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