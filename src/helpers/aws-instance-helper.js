import AWS from "aws-sdk"

const DEFAULT_INSTANCE_PARAMS = {
  ImageId: "ami-09a4a9ce71ff3f20b",
  InstanceType: "t2.micro",
  KeyName: "ubuntu1",
  MinCount: 1,
  MaxCount: 1,
}

export const createInstance = ({
  params,
  callbacks,
}) => {
  new AWS.EC2().runInstances({
    ...DEFAULT_INSTANCE_PARAMS,
    ...params,
  }).promise().then((data) => {
    let InstanceIds = [ data.Instances[0].InstanceId ]
    waitForPublicDnsName({
      params: { InstanceIds },
      callbacks,
    })
  }).catch(callbacks.catch)
}

const waitForPublicDnsName = ({
  params,
  callbacks,
}) => {
  let interval = setInterval(() => checker(), 1000)

  const checker = () => findInstances({ params, callbacks: {
    then: (data) => {
      let publicDnsName = data.Reservations[0].Instances[0].PublicDnsName

      if (!publicDnsName) return
    
      clearInterval(interval)
      callbacks.then(data)
    },
    catch: callbacks.catch,
  }})
}

export const findInstances = ({
  params,
  callbacks,
}) => {
  new AWS.EC2().describeInstances({
    ...params,
  }, (err, data) => {
    !err ? callbacks.then(data) : callbacks.catch(err)
  })
}

export const tagInstance = ({
  instanceId,
  tags,
  callbacks,
}) => {
  new AWS.EC2().createTags({
    Resources: [ instanceId ],
    Tags: tags,
  }).promise()
    .then(callbacks.then)
    .catch(callbacks.catch)
}

