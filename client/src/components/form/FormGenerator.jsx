import React from 'react';
import { Formik, Field, Form } from 'formik';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
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
}

// TODO: improve performance. Currently renders 4 times every key press

/**
 * textField - Renders the textField
 *
 * @param  {object} field   Specifications for the textfield
 * @param  {object} classes classeName from withStyles
 * @return {component}      TextField component
 */
const textField = (field, props, classes) => {
  return (
    <FormControl className={classes.formControl}>
      <TextField
        id={props.get("name")}
        name={props.get("name")}
        label={props.get("label")}
        value={field.value[props.get("name")] || ""}
        onChange={field.onChange}
        type={props.get("type")}
        {...props.get("options")}
        fullWidth />
    </FormControl>
  );
}

/**
 * selectField - Renders the textField
 *
 * @param  {object} field   Specifications for the textfield
 * @param  {object} classes classeName from withStyles
 * @return {component}      TextField component
 */
const selectField = (field, props, classes) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={props.get("name")}>{props.get("label")}</InputLabel>
      <Select
        value={field.value[props.get("name")] || ""}
        name={props.get("name")}
        onChange={field.onChange}
        inputProps={{
          id: props.get("name")
        }}>
        {props.get("items").map((item)=> {
          return <MenuItem key={item.get("label") + item.get("value")} value={item.get("value")}>{item.get("label")}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}

/**
 * textField - Renders the textField
 *
 * @param  {object} field   Specifications for the textfield
 * @param  {object} classes classeName from withStyles
 * @return {component}      TextField component
 */
const checkbox = (field, props, classes) => {
  return (
    <FormControl className={classes.formControl}>
      <FormControlLabel
        control={
          <Checkbox
            name={props.get("name")}
            checked={field.value[props.get("name")] ? true : false}
            onChange={field.onChange}
          />
        }
        label={props.get("label")}
      />
    </FormControl>
  );
}

const radioGroup = (field, props, classes) => {
  return (
    <FormControl className={classes.formControl}>
      <RadioGroup
        name={props.get("name")}
        onChange={field.handleChange}
        value={field.value[props.get("name")]}>
        {props.get("items").map((item)=>{
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
}

const button = (field, props) => {
  return (
    <Button onClick={this.onClick.bind(this, field)} >{field.get("label")}</Button>
  );
}

const title = (field, props) => {
  return (
    <div>
      <Divider style={{marginBottom: 25}} />
      <Typography variant={field.variant} >{field.get("label")}</Typography>
    </div>
  );
}

const submitButton =(field, props) => {
  return (
    <Button type="submit" onClick={this.submit.bind(this)} >{field.label}</Button>
  );
}

const fieldSelector = ({field, form, props, classes}) => {
  switch (props.get("type")) {
  case "date":
  case "number":
  case "text":
    return textField(field, props, classes);
  // case "datetime":
  //   return datetime(field, props.classes);
  case "select":
    return selectField(field, props, classes);
  case "checkbox":
    return checkbox(field, props, classes);
  case "button":
    return button(field, props, classes);
  case "submit":
    return submitButton(field, props, classes);
  case "radio":
    return radioGroup(field, props, props.classes);
  case "title":
    return title(field, props, props.classes);
  case "expansion":
    return field();
  default:
    return <div>Ce type de champs n'est pas pris en charge</div>;
  }
}

const FormGenerator = (module) => {
  return (
    <Formik
      initialValues={{email: ""}}
      render={({errors, touched, isSubmitting}) => (
        <Form>
          <Grid container spacing={16}>
            {module.fields.map((props)=>{
              // if (!field.get("options")) {
              //   field.options = {};
              // }
              if (!props.get("width")) {
                props.set("width", {xs:12});
              }
              if (props.get("type") === "expansion-panel") {
                return (
                  <Grid key={props.title} item {...props.width}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="title" >{props.get("title")}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container spacing={16}>
                          {props.get("fields").map((subfield)=>{
                            // if (!subfield.get("options")) {
                            //   subfield.options = {};
                            // }
                            if (!subfield.get("width")) {
                              subfield.set("width", {xs:12});
                            }
                            return (
                              <Grid key={subfield.get("name") + subfield.get("label")} item {...subfield.width}>
                                <Field key={subfield.get("name")} props={subfield} classes={module.classes} component={fieldSelector} />
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
                  <Grid key={props.get("name") + props.get("label")} item {...props.get("width").toJS()}>
                    <Field key={props.get("name")} props={props} classes={module.classes} component={fieldSelector} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Form>
      )}
      />
  );
}
// {module.fields.map((props)=>{
//   return <Field key={props.get("name")} props={props} classes={module.classes} component={fieldSelector} />;
// })}

export default withStyles(styles)(FormGenerator);
