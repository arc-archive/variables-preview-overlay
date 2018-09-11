// jshint ignore: start
window.dataGenerator = {
  environments: function() {
    const no = chance.integer({min: 1, max: 5});
    const result = [];
    for (let i = 0; i < no; i++) {
      result[result.length] = {
        name: chance.word(),
        created: chance.hammertime()
      };
    }
    return result;
  },

  variables: function() {
    const no = 10;
    const result = [];
    for (let i = 0; i < no; i++) {
      result[result.length] = {
        environment: 'default',
        variable: chance.word(),
        value: chance.word(),
        enabled: true,
        _id: 'default/' + chance.hammertime(),
        sysVar: chance.bool()
      };
    }
    return result;
  }
};
