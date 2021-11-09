module.exports = function reloadRecordPlugin(schema) {
  schema.methods.reload = async function () {
    const record = await this.constructor.findById(this);
    Object.assign(this, record);
    return record;
  };
};
