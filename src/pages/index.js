import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h3>What do you want to do?</h3>
    <Form>
      <Form.Group>
        <Button block
          onClick={() => window.location.href = "/ubuntu"}
        >Setup Your Ubuntu Machine!</Button>
      </Form.Group>
      <Form.Group>
        <Button block>Practice Language!</Button>
      </Form.Group>
      <Form.Group>
        <Button block>Create Website!</Button>
      </Form.Group>
    </Form>
  </Layout>
)

export default IndexPage

