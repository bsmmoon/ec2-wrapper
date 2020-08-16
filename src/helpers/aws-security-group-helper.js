import AWS from "aws-sdk"

const SECURITY_GROUP_DESCRIPTION = "This Security Group has been created by UNTITLED PROJECT"

export const createSshSecurityGroup = ({
  name,
  callbacks,
}) => {
  findSecurityGroups({ name, callbacks: {
    then: () => {
      addSshPermissions({ name, callbacks })
    },
    catch: () => {
      createSecurityGroup({ name, callbacks: {
        then: () => {
          addSshPermissions({ name, callbacks })
        },
        catch: (err) => {
          alert(err.message)
        }
      }})
    }
  }})  
}

export const findSecurityGroups = ({
  name,
  callbacks,
}) => {
  new AWS.EC2().describeSecurityGroups({
    GroupNames: [ name ]
  }, (err, data) => {
    !err ? callbacks.then(data) : callbacks.catch(err)
  })
}

export const createSecurityGroup = ({
  name,
  callbacks,
}) => {
  new AWS.EC2().createSecurityGroup({
    GroupName: name,
    Description: SECURITY_GROUP_DESCRIPTION,
  }, (err, data) => {
    !err ? callbacks.then(data) : callbacks.catch(err)
  })
}

export const addSshPermissions = ({
  name,
  callbacks,
}) => {
  new AWS.EC2().authorizeSecurityGroupIngress({
    GroupName: name,
    IpPermissions:[
      {
        IpProtocol: "tcp",
        FromPort: 80,
        ToPort: 80,
        IpRanges: [{"CidrIp":"0.0.0.0/0"}]
      },
      {
        IpProtocol: "tcp",
        FromPort: 22,
        ToPort: 22,
        IpRanges: [{"CidrIp":"0.0.0.0/0"}]
      },
    ]
  }, (err, data) => {
    if (!err || err.message.includes("already exists")) {
      return callbacks.then(data)
    }
    
    callbacks.catch(err)
  })
}

