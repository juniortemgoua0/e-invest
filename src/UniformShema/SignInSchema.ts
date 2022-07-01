import {JSONSchemaBridge} from "uniforms-bridge-json-schema";
import Ajv from "ajv"

const ajv = new Ajv({allErrors: true, useDefaults: true})

const SignInSchema = {
  title: "SignIn",
  type: "object",
  properties: {
    username: {type: "string" , label: "Numero de telephone"},
    password: {type: "string" , label: "Mot de passe"}
  },
  required: ["password", "username"]
}

function createValidator(schema: object) {
  const validator = ajv.compile(schema)
  return (model: object) => {
    validator(model)
    return validator.errors?.length ? {details: validator.errors} : null
  };
}

const SignInSchemaValidator = createValidator(SignInSchema)

export const bridge = new JSONSchemaBridge(SignInSchema, SignInSchemaValidator);
