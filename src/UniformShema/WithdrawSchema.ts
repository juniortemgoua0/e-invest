import {JSONSchemaBridge} from "uniforms-bridge-json-schema";
import Ajv from "ajv";

const ajv = new Ajv({allErrors: true, useDefaults:true});

const WithdrawSchema = {
  title: "Payment",
  type: "object",
  properties : {
    amount: { type: "number", label:"Montant de retrait"}
  },
  required: ["amount"]
}

function createValidator(schema: Object){
  const validator = ajv.compile(schema)
  return (model:Object) => {
    validator(model);
    return validator.errors?.length ? {details: validator.errors} : null
  }
}

const WithdrawSchemaValidator = createValidator(WithdrawSchema)

export const bridge = new JSONSchemaBridge(WithdrawSchema , WithdrawSchemaValidator)
