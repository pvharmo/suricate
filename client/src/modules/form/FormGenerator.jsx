import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Formik, Field, Form } from 'formik';
import actionsHandler from 'redux/actions';

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
        id={options.get("name")}
        name={options.get("name")}
        label={options.get("label")}
        value={field.value[options.get("name")] || ""}
        onChange={field.onChange}
        type={options.get("type")}
        {...options.get("options")}
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
      <InputLabel htmlFor={options.get("name")}>{options.get("label")}</InputLabel>
      <Select
        value={field.value[options.get("name")] || ""}
        name={options.get("name")}
        onChange={field.onChange}
        inputProps={{
          id: options.get("name")
        }}>
        {options.get("items").map((item)=> {
          return <MenuItem key={item.get("label") + item.get("value")} value={item.get("value")}>{item.get("label")}</MenuItem>;
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
            name={options.get("name")}
            checked={field.value[options.get("name")] ? true : false}
            onChange={field.onChange}
          />
        }
        label={options.get("label")}
      />
    </FormControl>
  );
};

const radioGroup = (field, options, classes) => {
  return (
    <FormControl className={classes.formControl}>
      <RadioGroup
        name={options.get("name")}
        onChange={field.handleChange}
        value={field.value[options.get("name")]}>
        {options.get("items").map((item)=>{
          return (
            <FormControlLabel
              key={item.get("value")}
              control={
                <Radio />
              }
              label={item.get("label")}
              value={item.get("value")}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const button = (field, form, options) => {
  const handleOnClick = () => {
    actionsHandler(options.get("onClick"), {values: form.values}, currentView);
  };
  return (
    <Button onClick={handleOnClick.bind(this)} >{options.get("label")}</Button>
  );
};

const title = (field, options) => {
  return (
    <div>
      <Divider style={{marginBottom: 25}} />
      <Typography variant={options.variant} >{options.get("label")}</Typography>
    </div>
  );
};

const submitButton = (field, form, options) => {
  return (
    <Button type="submit" >{options.get("label")}</Button>
  );
};

const fieldSelector = ({field, form, options, classes}) => {
  switch (options.get("type")) {
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

const FormGenerator = ({view, data, classes, module, ...options}) => {
  currentView = view;
  let defaultValues = {};
  if (view) {
    defaultValues = view.get("defaultValues");
    if (defaultValues) {
      defaultValues = defaultValues.find(function (obj){return obj.module === module.get("name");});
      if (defaultValues) {
        defaultValues = defaultValues.values;
      }
    }
  }
  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values, actions)=>{
        actionsHandler(module.get("onSubmit"), {values}, view);
      }}
      enableReinitialize
      render={({errors, touched, isSubmitting}) => (
        <Form>
          <Grid container spacing={16}>
            {module.get("fields").map((fields)=>{
              if (!fields.get("width")) {
                fields.set("width", {xs:12});
              }
              if (fields.get("type") === "expansion-panel") {
                return (
                  <Grid key={fields.title} item {...fields.width}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="title" >{fields.get("title")}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container spacing={16}>
                          {fields.get("fields").map((subfield)=>{
                            if (!subfield.get("width")) {
                              subfield.set("width", {xs:12});
                            }
                            return (
                              <Grid key={subfield.get("name") + subfield.get("label")} item {...subfield.width}>
                                <Field key={subfield.get("name")} options={subfield} classes={classes} component={fieldSelector} />
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
                  <Grid key={fields.get("name") + fields.get("label")} item {...fields.get("width").toJS()}>
                    <Field key={fields.get("name")} options={fields} classes={classes} component={fieldSelector} />
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
  view: ImmutablePropTypes.map,
  data: PropTypes.object,
  classes: PropTypes.object,
  module: ImmutablePropTypes.map,
  options: PropTypes.object
};

export default withStyles(styles)(FormGenerator);
