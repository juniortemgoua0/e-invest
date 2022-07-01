import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';
import Ajv from 'ajv';

const ajv = new Ajv({allErrors: true, useDefaults: true});

const SignUpSchema = {
  title: "SignUp",
  type: "object",
  properties: {
    first_name: {type: "string" , label: "Prenom"},
    last_name: {type: "string", label: "Nom"},
    email: {type: "string",  label: "Email"},
    phone_number: {type: "string" , label: "Numro de telephone"},
    password: {type: "string", label: "Mot de passe"},
    confirm_password: {type: "string", label: "Confirmer le mot de passe" },
    accept_terms_of_use: {type: "boolean"}
  },
  required: ["first_name", "last_name", "phone_number", "password", "confirm_password", "accept_terms_of_use"],
}

function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? {details: validator.errors} : null;
  };
}

const SignUpSchemaValidator = createValidator(SignUpSchema);

export const bridge = new JSONSchemaBridge(SignUpSchema, SignUpSchemaValidator);

