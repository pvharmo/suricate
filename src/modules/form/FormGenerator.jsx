import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';

import { ViewContext } from 'stores/ViewContext';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  formControl: {
    width: "100%"
  }
};

let currentView = {};
// let currentModule = {};

// TODO: improve performance. Currently renders 4 times for every key press

/**
 * textField - Renders the textField
 *
 * @param  {object} field   Specifications for the textfield
 * @param  {object} classes classeName from withStyles
 * @return {component}      TextField component
 */
const textField = (field, options, classes) => {
  return (
    <FormControl className={classes.formControl}>
      <TextField
        id={options.name}
        name={options.name}
        label={options.label}
        value={field.value[options.name] || ""}
        onChange={field.onChange}
        type={options.type}
        {...options.options}
        fullWidth />
    </FormControl>
  );
};

/**
 * selectField - Renders the textField
 *
 * @param  {object} field   Specifications for the textfield
 * @param  {object} classes classeName from withStyles
 * @return {component}      TextField component
 */
const selectField = (field, options, classes) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={options.name}>{options.label}</InputLabel>
      <Select
        value={field.value[options.name] || ""}
        name={options.name}
        onChange={field.onChange}
        inputProps={{
          id: options.name
        }}>
        {options.items.map((item)=> {
          return <MenuItem key={item.label + item.value} value={item.value}>{item.label}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

/**
 * textField - Renders the textField
 *
 * @param  {object} field   Specifications for the textfield
 * @param  {object} classes classeName from withStyles
 * @return {component}      TextField component
 */
const checkbox = (field, options, classes) => {
  return (
    <FormControl className={classes.formControl}>
      <FormControlLabel
        control={
          <Checkbox
            name={options.name}
            checked={field.value[options.name] ? true : false}
            onChange={field.onChange}
          />
        }
        label={options.label}
      />
    </FormControl>
  );
};

const radioGroup = (field, options, classes) => {
  return (
    <FormControl className={classes.formControl}>
      <RadioGroup
        name={options.name}
        onChange={field.handleChange}
        value={field.value[options.name]}>
        {options.items.map((item)=>{
          return (
            <FormControlLabel
              key={item.value}
              control={
                <Radio />
              }
              label={item.label}
              value={item.value}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const button = (field, form, options) => {
  const handleOnClick = () => {
    // actionsHandler(options.get("onClick"), {values: form.values}, currentView);
  };
  return (
    <Button onClick={handleOnClick.bind(this)} >{options.label}</Button>
  );
};

const title = (field, options) => {
  return (
    <div>
      <Divider style={{marginBottom: 25}} />
      <Typography variant={options.variant} >{options.label}</Typography>
    </div>
  );
};

const submitButton = (field, form, options) => {
  return (
    <Button type="submit" >{options.label}</Button>
  );
};

const fieldSelector = ({field, form, options, classes}) => {
  switch (options.type) {
  case "date":
  case "number":
  case "text":
  case "password":
    return textField(field, options, classes);
  // case "datetime":
  //   return datetime(field, options.classes);
  case "select":
    return selectField(field, options, classes);
  case "checkbox":
    return checkbox(field, options, classes);
  case "button":
    return button(field, form, options, classes);
  case "submit":
    return submitButton(field, form, options, classes);
  case "radio":
    return radioGroup(field, options, options.classes);
  case "title":
    return title(field, options, options.classes);
  case "expansion":
    return field();
  default:
    return <div>{"Ce type de champs n'est pas pris en charge"}</div>;
  }
};

const FormGenerator = ({ data, classes, module, ...options }) => {
  const view = useContext(ViewContext);
  currentView = view;
  let defaultValues = {};
  if (view) {
    defaultValues = view.defaultValues;
    if (defaultValues) {
      defaultValues = defaultValues.find(function (obj){return obj.module === module.name;});
      if (defaultValues) {
        defaultValues = defaultValues.values;
      }
    }
  }
  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values, actions)=>{
        // actionsHandler(module.get("onSubmit"), {values}, view);
      }}
      enableReinitialize
      render={({errors, touched, isSubmitting}) => (
        <Form>
          <Grid container spacing={16}>
            {module.fields.map((fields)=>{
              if (!fields.width) {
                fields.width = {xs:12};
              }
              if (fields.type === "expansion-panel") {
                return (
                  <Grid key={fields.title} item {...fields.width}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="title" >{fields.title}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container spacing={16}>
                          {fields.fields.map((subfield)=>{
                            if (!subfield.width) {
                              subfield.width = {xs:12};
                            }
                            return (
                              <Grid key={subfield.name + subfield.label} item {...subfield.width}>
                                <Field key={subfield.name} options={subfield} classes={classes} component={fieldSelector} />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                );
              } else {
                return (
                  <Grid key={fields.name + fields.label} item {...fields.width}>
                    <Field key={fields.name} options={fields} classes={classes} component={fieldSelector} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Form>
      )}
    />
  );
};

FormGenerator.propTypes ={
  view: PropTypes.object,
  data: PropTypes.object,
  classes: PropTypes.object,
  module: PropTypes.object,
  options: PropTypes.object
};

export default withStyles(styles)(FormGenerator);
