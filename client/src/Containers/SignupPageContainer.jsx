import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Slider,
  Box,
  MenuItem,
} from "@mui/material";

const AccountCreationForm = () => {
  // STATE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [filingStatus, setFilingStatus] = useState("");
  const [state, setState] = useState("");
  // const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [estimatedIncome, setEstimatedIncome] = useState(30);
  const [businessExpenses, setBusinessExpenses] = useState(30);
  const [preTaxContributions, setPreTaxContributions] = useState(30);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // FORM SUBMISSION LOGIC

    // CONSOLE LOG TEST
    const formData = {
      firstName,
      lastName,
      filingStatus,
      state,
      // industry,
      email,
      password,
      estimatedIncome,
      businessExpenses,
      preTaxContributions,
    };

    console.log("Form Data:", formData);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4, fontFamily: '"Roboto-Black", Helvetica' }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Create An Account
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Please fill out all information as accurately as possible
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          select
          fullWidth
          margin="normal"
          label="Filing Status"
          variant="outlined"
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value)}
        >
          <MenuItem value="single">Single</MenuItem>
          <MenuItem value="married_joint">Married Filing Jointly</MenuItem>
          <MenuItem value="married_separate">
            Married Filing Separately
          </MenuItem>
          <MenuItem value="head_of_household">Head of Household</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          margin="normal"
          label="State"
          variant="outlined"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <MenuItem value="AL">Alabama</MenuItem>
          <MenuItem value="AK">Alaska</MenuItem>
          <MenuItem value="AZ">Arizona</MenuItem>
          <MenuItem value="AR">Arkansas</MenuItem>
          <MenuItem value="CA">California</MenuItem>
          <MenuItem value="CO">Colorado</MenuItem>
          <MenuItem value="CT">Connecticut</MenuItem>
          <MenuItem value="DE">Delaware</MenuItem>
          <MenuItem value="FL">Florida</MenuItem>
          <MenuItem value="GA">Georgia</MenuItem>
          <MenuItem value="HI">Hawaii</MenuItem>
          <MenuItem value="ID">Idaho</MenuItem>
          <MenuItem value="IL">Illinois</MenuItem>
          <MenuItem value="IN">Indiana</MenuItem>
          <MenuItem value="IA">Iowa</MenuItem>
          <MenuItem value="KS">Kansas</MenuItem>
          <MenuItem value="KY">Kentucky</MenuItem>
          <MenuItem value="LA">Louisiana</MenuItem>
          <MenuItem value="ME">Maine</MenuItem>
          <MenuItem value="MD">Maryland</MenuItem>
          <MenuItem value="MA">Massachusetts</MenuItem>
          <MenuItem value="MI">Michigan</MenuItem>
          <MenuItem value="MN">Minnesota</MenuItem>
          <MenuItem value="MS">Mississippi</MenuItem>
          <MenuItem value="MO">Missouri</MenuItem>
          <MenuItem value="MT">Montana</MenuItem>
          <MenuItem value="NE">Nebraska</MenuItem>
          <MenuItem value="NV">Nevada</MenuItem>
          <MenuItem value="NH">New Hampshire</MenuItem>
          <MenuItem value="NJ">New Jersey</MenuItem>
          <MenuItem value="NM">New Mexico</MenuItem>
          <MenuItem value="NY">New York</MenuItem>
          <MenuItem value="NC">North Carolina</MenuItem>
          <MenuItem value="ND">North Dakota</MenuItem>
          <MenuItem value="OH">Ohio</MenuItem>
          <MenuItem value="OK">Oklahoma</MenuItem>
          <MenuItem value="OR">Oregon</MenuItem>
          <MenuItem value="PA">Pennsylvania</MenuItem>
          <MenuItem value="RI">Rhode Island</MenuItem>
          <MenuItem value="SC">South Carolina</MenuItem>
          <MenuItem value="SD">South Dakota</MenuItem>
          <MenuItem value="TN">Tennessee</MenuItem>
          <MenuItem value="TX">Texas</MenuItem>
          <MenuItem value="UT">Utah</MenuItem>
          <MenuItem value="VT">Vermont</MenuItem>
          <MenuItem value="VA">Virginia</MenuItem>
          <MenuItem value="WA">Washington</MenuItem>
          <MenuItem value="WV">West Virginia</MenuItem>
          <MenuItem value="WI">Wisconsin</MenuItem>
          <MenuItem value="WY">Wyoming</MenuItem>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography gutterBottom>Estimated Income</Typography>
        <Slider
          value={estimatedIncome}
          onChange={(e, newValue) => setEstimatedIncome(newValue)}
          aria-labelledby="estimated-income-slider"
          valueLabelDisplay="auto"
          min={10000}
          max={200000}
          step={10000}
          valueLabelFormat={(value) => `$${value.toLocaleString()}`}
        />
        <Typography gutterBottom>Business Expenses</Typography>
        <Slider
          value={businessExpenses}
          onChange={(e, newValue) => setBusinessExpenses(newValue)}
          aria-labelledby="business-expenses-slider"
          valueLabelDisplay="auto"
          min={10000}
          max={200000}
          step={10000}
          valueLabelFormat={(value) => `$${value.toLocaleString()}`}
        />
        <Typography gutterBottom>Pre-Tax Retirement Contributions</Typography>
        <Slider
          value={preTaxContributions}
          onChange={(e, newValue) => setPreTaxContributions(newValue)}
          aria-labelledby="pre-tax-contributions-slider"
          valueLabelDisplay="auto"
          min={10000}
          max={200000}
          step={10000}
          valueLabelFormat={(value) => `$${value.toLocaleString()}`}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#000",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
            mt: 3,
            mb: 2,
          }}
          fullWidth
        >
          CREATE ACCOUNT
        </Button>
      </Box>
    </Container>
  );
};

export default AccountCreationForm;
