import { Bridge } from 'uniforms';

type SignUp = {

  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string,
  confirm_password: string,
  accept_terms_of_use: string,

}

const SignUpSchema = {

  first_name: {
    __type__: String,
    required: true,
    label: "Prenom"
  },
  last_name: {
    __type__: String,
    required: true,
    label: "Nom"
  },
  email: {
    __type__: String,
    label: "Email"
  },
  phone_number: {
    __type__: String,
    required: true,
    label: "Numero de telephone"
  },
  password: {
    __type__: String,
    required: true,
    label: "Mot de passe"
  },
  confirm_password: {
    __type__: String,
    required: true,
    label: "Confirmer le mot de passe"
  },
  accept_terms_of_use: {
    __type__: "boolean",
  }

};

const SignUpSchemaValidator = (model: any) => {

  const error = {} as SignUp;

  if (!model.first_name) {
    error.first_name = ' Prenom est requis ';
  }

  if (!model.last_name) {
    error.last_name = ' Nom est requis ';
  }

  if (!model.phone_number) {
    error.phone_number = ' Numero de telephone requis ';
  }

  if (!model.password) {
    error.password = 'Mot de passe requis';
  }else if (model.password.length < 6) {
    error.password = 'Veuillez entrez au moins 6 caracteres';
  }

  if (!model.confirm_password) {
    error.confirm_password = 'Entrez de nouveau votre mot de passe';
  }else if (model.confirm_password !== model.password){
    error.confirm_password = "Les mots de passe ne correspondent pas. Veuillez reessayer"
  }

  if (!model.accept_terms_of_use) {
    error.accept_terms_of_use = 'Vous devez lire et accepter la polique de confidentialite';
  }

  if (Object.keys(error).length) {
    return error;
  }
};

export default class SignUpSchemaBridge extends Bridge {
  public schema : any
  public validator : any

  constructor(schema: any, validator: any) {
    super();

    this.schema = schema;
    this.validator = validator;
  }

  getError(name: any, error: any) {
    return error && error[name];
  }

  getErrorMessage(name:any, error:any) {
    return (error && error[name]) || '';
  }

  getErrorMessages(error:any) {
    return error ? Object.keys(this.schema).map(field => error[field]) : [];
  }

  getField(name:any) {
    return this.schema[name.replace(/\.\d+/g, '.$')];
  }

  getType(name:any) {
    return this.schema[name.replace(/\.\d+/g, '.$')].__type__;
  }

  getProps(name:any) {
    return this.schema[name.replace(/\.\d+/g, '.$')];
  }

  getInitialValue(name:any) {
    return this.schema[name.replace(/\.\d+/g, '.$')].initialValue;
  }

  getSubfields(name:any) {
    return name
      ? this.schema[name.replace(/\.\d+/g, '.$')].subfields || []
      : Object.keys(this.schema).filter(field => field.indexOf('.') === -1);
  }

  getValidator() {
    return this.validator;
  }
}

export const bridge = new SignUpSchemaBridge(
  SignUpSchema,
  SignUpSchemaValidator,
);










// import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';
// import Ajv from 'ajv';

// const ajv = new Ajv({allErrors: true, useDefaults: true});
//
// const SignUpSchema = {
//   title: "SignUp",
//   type: "object",
//   properties: {
//     first_name: {type: "string" , label: "Prenom"},
//     last_name: {type: "string", label: "Nom"},
//     email: {type: "string",  label: "Email"},
//     phone_number: {type: "string" , label: "Numro de telephone"},
//     password: {type: "string", label: "Mot de passe"},
//     confirm_password: {type: "string", label: "Confirmer le mot de passe" },
//     accept_terms_of_use: {type: "boolean"}
//   },
//   required: ["first_name", "last_name", "phone_number", "password", "confirm_password", "accept_terms_of_use"],
// }
//
// function createValidator(schema: object) {
//   const validator = ajv.compile(schema);
//
//   return (model: object) => {
//     validator(model);
//     return validator.errors?.length ? {details: validator.errors} : null;
//   };
// }
//
// const SignUpSchemaValidator = createValidator(SignUpSchema);
//
// export const bridge = new JSONSchemaBridge(SignUpSchema, SignUpSchemaValidator);
