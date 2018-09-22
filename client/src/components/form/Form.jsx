import React from "react";

// import moment from 'moment';
// import 'moment/locale/fr';

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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  formControl: {
    width: "100%"
  },
  datetime:{
    rdt: {
      position: "relative"
    },
    rdtPicker: {
      display: "none",
      position: "absolute",
      width: 250,
      padding: 4,
      marginTop: 1,
      zIndex: "99999 !important",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,.1)",
      border: "1px solid #f9f9f9"
    }
  }
};


/**
 *  Component generating a form.
 */
class Form extends React.Component {

  constructor(props) {
    super(props);

    let values = this.props.values;

    this.state = {
      values: {...values},
      confirmation: false
    };
  }

  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.values !== this.state.values) {
      this.setState({ values: {...nextProps.values} });
    }
  }

  /**
   * handleChange - Handle change in textField, selectField and radioGroup
   *
   * @param  {React synthetic event} event
   */
  handleChange(event) {
    let values = this.state.values;
    values[event.target.name] = event.target.value;
    this.setState(values);
  }

  /**
   * handleCheck - Handle change in checkbox
   *
   * @param  {React synthetic event} event
   */
  handleCheck(event) {
    let values = this.state.values;
    values[event.target.name] = event.target.checked;
    this.setState(values);
  }


  /**
   * textField - Renders the textField
   *
   * @param  {object} field   Specifications for the textfield
   * @param  {object} classes classeName from withStyles
   * @return {component}      TextField component
   */
  textField(field, classes) {
    return (
      <FormControl className={classes.formControl}>
        <TextField
          id={field.get("name")}
          name={field.get("name")}
          label={field.get("label")}
          value={this.state.values[field.get("name")] || ""}
          onChange={this.handleChange.bind(this)}
          type={field.get("type")}
          {...field.get("options")}
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
  selectField(field, classes) {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={field.get("name")}>{field.get("label")}</InputLabel>
        <Select
          value={this.state.values[field.get("name")] || ""}
          name={field.get("name")}
          onChange={this.handleChange.bind(this)}
          inputProps={{
            id: field.get("name")
          }}>
          {field.get("items").map((item)=> {
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
  checkbox(field, classes) {
    return (
      <FormControl className={classes.formControl}>
        <FormControlLabel
          control={
            <Checkbox
              name={field.get("name")}
              checked={this.state.values[field.get("name")] ? true : false}
              onChange={this.handleCheck.bind(this)}
            />
          }
          label={field.get("label")}
        />
      </FormControl>
    );
  }

  radioGroup(field, classes) {
    return (
      <FormControl className={classes.formControl}>
        <RadioGroup
          name={field.get("name")}
          onChange={this.handleChange.bind(this)}
          value={this.state.values[field.name]}>
          {field.get("items").map((item)=>{
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

  button(field) {
    return (
      <Button onClick={this.onClick.bind(this, field)} >{field.get("label")}</Button>
    );
  }

  title(field) {
    return (
      <div>
        <Divider style={{marginBottom: 25}} />
        <Typography variant={field.variant} >{field.get("label")}</Typography>
      </div>
    );
  }

  onClick(field) {
    if (field.confirmation) {
      this.setState({confirmation: true, afterConfirmation: field.onClick});
    } else {
      field.onClick();
    }
  }

  submitButton(field) {
    return (
      <Button type="submit" onClick={this.submit.bind(this)} >{field.label}</Button>
    );
  }

  handleClose(dialog) {
    this.setState({[dialog]: false});
  }

  confirm() {
    this.handleClose("confirmation");
    this.state.afterConfirmation();
  }

  confirmationDialog(field) {
    return (
      <Dialog
        open={this.state.confirmation}
        onClose={this.handleClose.bind(this, "confirmation")}
      >
        {field.confirmationTitle && <DialogTitle id="alert-dialog-title">{field.confirmationTitle}</DialogTitle>}
        <DialogContent>
          {field.confirmationText &&
            <DialogContentText id="alert-dialog-description">
              {field.confirmationText}
            </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this, "confirmation")} color="primary">
            Annluer
          </Button>
          <Button onClick={this.confirm.bind(this)} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  field(field, classes) {
    switch (field.get("type")) {
    case "date":
    case "number":
    case "text":
      return this.textField(field, classes);
    case "datetime":
      return this.datetime(field, classes);
    case "select":
      return this.selectField(field, classes);
    case "checkbox":
      return this.checkbox(field, classes);
    case "button":
      return this.button(field, classes);
    case "submit":
      return this.submitButton(field, classes);
    case "radio":
      return this.radioGroup(field, classes);
    case "title":
      return this.title(field, classes);
    case "expansion":
      return this.field();
    default:
      return <div>Ce type de champs n'est pas pris en charge</div>;
    }
  }

  submit() {
    this.props.onSubmit(this.state.values);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={16}>
        {this.props.fields.map((field)=>{
          // if (!field.get("options")) {
          //   field.options = {};
          // }
          if (!field.get("width")) {
            field.set("width", {xs:12});
          }
          if (field.get("type") === "expansion-panel") {
            return (
              <Grid key={field.title} item {...field.width}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="title" >{field.get("title")}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container spacing={16}>
                      {field.get("fields").map((subfield)=>{
                        // if (!subfield.get("options")) {
                        //   subfield.options = {};
                        // }
                        if (!subfield.get("width")) {
                          subfield.set("width", {xs:12});
                        }
                        return (
                          <Grid key={subfield.get("name") + subfield.get("label")} item {...subfield.width}>
                            {this.field(subfield, classes)}
                            {this.confirmationDialog(subfield)}
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
              <Grid key={field.get("name") + field.get("label")} item {...field.get("width").toJS()}>
                {this.field(field, classes)}
                {this.confirmationDialog(field)}
              </Grid>
            );
          }
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(Form);
