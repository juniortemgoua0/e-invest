import {JSONSchemaBridge} from "uniforms-bridge-json-schema";
import Ajv from "ajv"

const ajv = new Ajv({allErrors: true, useDefaults: true})

const PaymentSchema = {
  title: "Payment",
  type: "object",
  properties: {
    phone_number: {type: "number" , label: "Numero de paiement"},
  },
  required: ["phone_number"]
}

function createValidator(schema: object) {
  const validator = ajv.compile(schema)
  return (model: object) => {
    validator(model)
    return validator.errors?.length ? {details: validator.errors} : null
  };
}

const SignInSchemaValidator = createValidator(PaymentSchema)

export const bridge = new JSONSchemaBridge(PaymentSchema, SignInSchemaValidator);
