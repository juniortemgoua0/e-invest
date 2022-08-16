import {Bridge} from 'uniforms';

type SignUp = {

  first_name: string,
  last_name: string,
  email: string,
  adresse: string,
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
  adresse: {
    __type__: String,
    required: true,
    label: "Adresse"
  },
  phone_number: {
    __type__: Number,
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
    __type__: Boolean,
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

  if (!model.adresse) {
    error.adresse = 'Adresse est requis';
  }

  if (!model.password) {
    error.password = 'Mot de passe requis';
  } else if (model.password.length < 6) {
    error.password = 'Veuillez entrez au moins 6 caracteres';
  }

  if (!model.confirm_password) {
    error.confirm_password = 'Entrez de nouveau votre mot de passe';
  } else if (model.confirm_password !== model.password) {
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
  public schema: any
  public validator: any

  constructor(schema: any, validator: any) {
    super();

    this.schema = schema;
    this.validator = validator;
  }

  getError(name: any, error: any) {
    return error && error[name];
  }

  getErrorMessage(name: any, error: any) {
    return (error && error[name]) || '';
  }

  getErrorMessages(error: any) {
    return error ? Object.keys(this.schema).map(field => error[field]) : [];
  }

  getField(name: any) {
    return this.schema[name.replace(/\.\d+/g, '.$')];
  }

  getType(name: any) {
    return this.schema[name.replace(/\.\d+/g, '.$')].__type__;
  }

  getProps(name: any) {
    return this.schema[name.replace(/\.\d+/g, '.$')];
  }

  getInitialValue(name: any) {
    return this.schema[name.replace(/\.\d+/g, '.$')].initialValue;
  }

  getSubfields(name: any) {
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

