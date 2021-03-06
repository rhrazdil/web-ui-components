import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, Col, ControlLabel, HelpBlock, Form, FieldLevelHelp } from 'patternfly-react';
import { get } from 'lodash';

import { Dropdown, Checkbox, Text, TextArea, Integer } from '.';
import { VALIDATION_INFO_TYPE, VALIDATION_ERROR_TYPE } from '../../constants';
import { getValidationObject } from '../../utils/validations';
import { ERROR_IS_REQUIRED } from '../Wizard/CreateVmWizard/strings';
import { settingsValue } from '../../k8s/selectors';

export const getFormElement = props => {
  const {
    type,
    id,
    value,
    title,
    onChange,
    onBlur,
    choices,
    defaultValue,
    isControlled,
    disabled,
    className,
    CustomComponent,
  } = props;
  switch (type) {
    case 'textarea':
      return (
        <TextArea
          id={id}
          key={id}
          value={isControlled ? value || '' : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          onBlur={onBlur}
          className={className}
          onChange={onChange}
          disabled={disabled}
        />
      );
    case 'dropdown':
      return (
        <Dropdown id={id} value={value || defaultValue} onChange={onChange} choices={choices} disabled={disabled} />
      );
    case 'checkbox':
      return (
        <Checkbox
          id={id}
          key={id}
          title={title}
          checked={isControlled ? value || false : undefined}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
        />
      );
    case 'positive-number':
      return (
        <Integer
          id={id}
          key={id}
          value={isControlled ? value || '' : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          onBlur={onBlur}
          onChange={onChange}
          positive
          disabled={disabled}
        />
      );
    case 'label':
      return (
        <div className={className} key={id}>
          {value}
        </div>
      );
    case 'custom':
      return <CustomComponent />;
    default:
      return (
        <Text
          id={id}
          key={id}
          value={isControlled ? value || '' : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
        />
      );
  }
};

export const validateForm = (formFields, formValues) => {
  let formValid = true;

  const visibleFieldKeys = Object.keys(formFields).filter(
    key => formFields[key] && (formFields[key].isVisible ? formFields[key].isVisible(formValues) : true)
  );

  // check if all required fields are defined
  const requiredKeys = visibleFieldKeys.filter(key => formFields[key].required);
  formValid = requiredKeys.every(key => settingsValue(formValues, key));

  if (formValid) {
    // check if all fields are valid
    formValid = visibleFieldKeys.every(key => get(formValues[key], 'validation.type') !== VALIDATION_ERROR_TYPE);
  }

  return formValid;
};

const onChange = (formFields, formValues, value, key, onFormChange) => {
  const newFormValues = {
    ...formValues,
    [key]: {
      value,
    },
  };

  let validation;
  const changedField = formFields[key];
  if (changedField.required && String(value).trim().length === 0) {
    validation = getValidationObject(ERROR_IS_REQUIRED);
  } else if (changedField.validate) {
    validation = changedField.validate(newFormValues);
  }

  if (validation) {
    validation.message = `${changedField.title} ${validation.message}`;
  }

  newFormValues[key].validation = validation;

  const formValid = validateForm(formFields, newFormValues);

  onFormChange({ value, validation }, key, formValid);
};

const getFormGroups = ({ fields, fieldsValues, onFormChange, textPosition, labelSize, controlSize, horizontal }) =>
  Object.keys(fields)
    .filter(key => fields[key] && (!fields[key].isVisible || fields[key].isVisible(fieldsValues)))
    .map(key => {
      const field = fields[key];
      const values = fieldsValues[key];
      const validation = get(values, 'validation');
      const value = get(values, 'value');
      const hasValidationMessage = !!get(validation, 'message');

      const child = getFormElement({
        ...field,
        value,
        isControlled: true,
        onChange: newValue => onChange(fields, fieldsValues, newValue, key, onFormChange),
      });

      const label = horizontal &&
        field.title && (
          <Col sm={labelSize} className={textPosition}>
            {field.type !== 'checkbox' && (
              <React.Fragment>
                <ControlLabel className={field.required ? 'required-pf' : null}>{field.title}</ControlLabel>
                {field.help && (
                  <FieldLevelHelp className="kubevirt-form-group__field-help" placement="right" content={field.help} />
                )}
              </React.Fragment>
            )}
          </Col>
        );

      return (
        <FormGroup
          key={key}
          validationState={validation && validation.type !== VALIDATION_INFO_TYPE ? validation.type : null}
          className={classNames('kubevirt-form-group', {
            'kubevirt-form-group--no-bottom': horizontal && field.noBottom,
            'kubevirt-form-group--help': !horizontal && hasValidationMessage,
            'kubevirt-form-group--no-help': !horizontal && !hasValidationMessage,
          })}
        >
          {label}
          <Col sm={controlSize}>
            {child}
            <HelpBlock>{get(validation, 'message')}</HelpBlock>
          </Col>
        </FormGroup>
      );
    });

export const InlineFormFactory = ({ fields, fieldsValues, onFormChange }) =>
  getFormGroups({ fields, fieldsValues, onFormChange, horizontal: true });

export const ListFormFactory = ({ fields, fieldsValues, onFormChange, actions, columnSizes }) => {
  const formGroups = getFormGroups({ fields, fieldsValues, onFormChange });
  const form = formGroups.map((formGroup, index) => (
    <Col
      key={`col-${index}`}
      {...columnSizes}
      className={classNames('kubevirt-list-form-factory__column', {
        'kubevirt-list-form-factory__column--last': index === formGroups.length - 1,
      })}
    >
      {formGroup}
    </Col>
  ));

  return (
    <React.Fragment>
      {form}
      <div className="kubevirt-list-form-factory__actions">{actions}</div>
    </React.Fragment>
  );
};

ListFormFactory.propTypes = {
  fields: PropTypes.object.isRequired,
  fieldsValues: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  columnSizes: PropTypes.object.isRequired,
};

export const FormFactory = ({
  fields,
  fieldsValues,
  onFormChange,
  textPosition,
  labelSize,
  controlSize,
  formClassName,
}) => {
  const formGroups = getFormGroups({
    fields,
    fieldsValues,
    onFormChange,
    textPosition,
    labelSize,
    controlSize,
    horizontal: true,
  });
  return (
    <Form horizontal className={formClassName}>
      {formGroups}
    </Form>
  );
};

FormFactory.defaultProps = {
  textPosition: 'text-right',
  labelSize: 3,
  controlSize: 5,
  formClassName: undefined,
};

FormFactory.propTypes = {
  fields: PropTypes.object.isRequired,
  fieldsValues: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  textPosition: PropTypes.string,
  labelSize: PropTypes.number,
  controlSize: PropTypes.number,
  formClassName: PropTypes.string,
};
