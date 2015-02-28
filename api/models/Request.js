module.exports =
{
  attributes:
  {
    name: 'string',
    services: {
       collection: 'RequestedService',
       via: 'parentRequest'
    },
    owner: {
       model: 'User'
    }
  }
};

