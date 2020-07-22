[![Netlify Status](https://api.netlify.com/api/v1/badges/5a89f402-2b1f-44ed-a723-07b7cbacd75f/deploy-status)](https://app.netlify.com/sites/tcl-5-smart-shopping-list/deploys)

# Overview

The goal of this project is to create a “smart” shopping list app that learns your buying habits and helps you remember what you’re likely to need to buy on your next trip to the store.

How it works is that you will enter items (e.g., “Greek yogurt” or “Paper towels”) into your list. Each time you buy the item, you mark it as purchased in the list. Over time, the app comes to understand the intervals at which you buy different items. If an item is likely to be due to be bought soon, it rises to the top of the shopping list.

The app will work in many of the same ways as [iNeedToBuy.xyz](https://app.ineedtobuy.xyz/) (on which our project is based) with the exception that we will not be implementing barcode scanning (that feature would add a lot of scope to the project and in my experience wasn’t all that useful).

For additional details, please check out the [project brief](PROJECT-BRIEF.md).

<hr>

# Quick Links
- [Team Members](#team-members)
- [Setup](#setup)
  - [Online Access](#requirements-for-online-access)
  - [Deploy Locally](#requirements-for-running-locally)
- [Project Tools](#project-tools)
- [Getting Started with the App](#getting-started-with-the-app)
- [Design](#design)
  - [Code](#code)
  - [User Interface](#user-interface)

# Team Members
## [The Collab Lab, Cohort 5](https://the-collab-lab.codes/about-us#cohort-5)
- [Aisling](https://github.com/AshlingH)
- [Diane](https://github.com/dkimlim)
- [Jennifer](https://github.com/jendevelops)
- [Jon](https://github.com/jonbascos)

## [Mentors](https://the-collab-lab.codes/about-us#mentors)
- [Joey](https://github.com/joeylaguna)
- [Lauren](https://github.com/laurenmbeatty)
- [Stacie](https://github.com/stacietaylorcima)

# Steup
## Requirements for Online Access
- Internet Connection
- Internet Browser
- Site: https://tcl-5-smart-shopping-list.netlify.com/

Please visit the [netlify hosted site](tcl-5-smart-shopping-list.netlify.com) to view the app online. If you need help navigating the app please see the [Getting Started With the App](#getting-started-with-the-app) section.

## Requirements for Running Locally
- Internet Connection
- Internet Browser
- Bash Terminal
- Node.js
- Node Package Manager (npm)
- Github Respository: https://github.com/the-collab-lab/tcl-5-smart-shopping-list

If you do not have the Node.js installed on your computer, please install it by following the directions for your operating system here. The Node.js version used for this project is v8.10.0. NPM is installed with Node.js. The current version of NPM used for this project is v3.5.2. If you need Node support, visit [Node.js's website](https://nodejs.org/).

To view locally please copy the [link to this repo](https://github.com/the-collab-lab/tcl-5-smart-shopping-list.git) and type the following command into your Bash terminal:
```
$git clone https://github.com/the-collab-lab/tcl-5-smart-shopping-list.git
```
 To open the console app, navigate to the local directory which the online repository was cloned to using the command

```
$cd tcl-5-smart-shopping-list
```

Once in the correct repository, and confirming that you have Node.js installed, install the required dependencies using the following command

```
$npm i
```

Once npm has restored the required dependencies, run the app with the command

$npm start

If a browser does not automatically open the locally hosted instance, navigate to the [local host link](http://localhost:3000/) and enjoy!

# Getting Started With The App

*helpful screenshots and stuff will go here*

# Project Tools
### Code formatting

We’re using [Prettier](https://prettier.io/) to format our code before every commit, this is done automatically and will not affect the way you work!
If you’re curious, here’s the PR that adds this feature https://github.com/the-collab-lab/smart-shopping-list/pull/30

# Design
## Code
### App Wide Functions
These are functions that live in /src/lib/ that were abstracted out for ease of use throughout the whole app.

#### estimates.js
<em>Provided by [Andrew Hedges](https://github.com/segdeha), Updated by [Members of Cohort 5](https://the-collab-lab.codes/about-us#cohort-5)</em>

 Calculates a weighted estimate for the interval until the next purchase.
 * Current purchase a tiny bit less weight than all previous purchases
 * <b>lastEstimate</b> (Number): The last stored purchase interval estimate // TimeFrame
 * <b>latestInterval</b> (Number): The interval between the most recent and previous purchases
 * <b>numberOfPurchases</b> (Number): Total number of purchases for the item




```
const calculateEstimate = (lastEstimate, latestInterval, numberOfPurchases) => {
    if (isNaN(lastEstimate)) {
            lastEstimate = 14;
    }
    let previousFactor = lastEstimate * numberOfPurchases;
    let latestFactor = latestInterval * (numberOfPurchases - 1);
    let totalDivisor = numberOfPurchases * 2 - 1;
    return Math.round((previousFactor + latestFactor) / totalDivisor);
};

```

An update was added by the members of Cohort 5, after noticing that the calculateEstimate displayed odd behavior, returning negative estimates, when the item had only been purchased once. A conditional was added to check for how many times an item was purchased, opting to return the latest interval if it was purchased only once, and returning the original calculation for 2 or more historical purchases.



```
const calculateEstimate = (lastEstimate, latestInterval, numberOfPurchases) => {
    if (numberOfPurchases > 1) {
        if (isNaN(lastEstimate)) {
                lastEstimate = 14;
        }
        let previousFactor = lastEstimate * numberOfPurchases;
        let latestFactor = latestInterval * (numberOfPurchases - 1);
        let totalDivisor = numberOfPurchases * 2 - 1;
        return Math.round((previousFactor + latestFactor) / totalDivisor);
    } else {
        return latestInterval;
    }
};
```

#### firebase.js

<em>Provided by [Andrew Hedges](https://github.com/segdeha) and [Stacie Taylor-Cima](https://github.com/stacietaylorcima)</em>

The configuration for the TCL 5 Firebase instance.


#### normalizeString.js

<em>Written by [Diane](https://github.com/dkimlim) and [Jennifer](https://github.com/jendevelops)</em>

In response to creating an alert for duplicate normalized items described in [this issue](https://github.com/the-collab-lab/tcl-5-smart-shopping-list/issues/7), a helper function was created to be utilized throughout the app when a [shopping list filter issue](https://github.com/the-collab-lab/tcl-5-smart-shopping-list/issues/10) needed to utilize the same normalization logic.

The simple function utilizes Javascript built in string manipulations to:
- remove any casing
- replace any non alphanumeric symbols
- trim any extra space at the beginning or the end of the string
- any double spaces with single spaces

```
const normalizeString = (inputString) => {
    const output = inputString
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .trim()
    .replace(/\s{2,}/g, ' ');
    return output
}
```

#### timeframeConstants.js
<em>Written by [Aisling](https://github.com/AshlingH), [Diane](https://github.com/dkimlim), and [Jennifer](https://github.com/jendevelops)</em>

Magic numbers are a programming concept that refers to the use of numbers directly in code without any context. The use of magic numbers are discouraged as they can confuse and obfuscate where the number originated and why it's there.

As you can see in the example below, we added the numbers 7, 14, and 30 as our constants to be stored into Firebase. Later on in other parts of the app, we would have to remember that these were the three numbers used to define the three different time frames, otherwise we would have to comb the app looking for the context of what the number 7 means.

<em>Snippet from /src/components/AddItemForm.js</em>
```
<div>
    <h1>How soon are you likely to buy it again?</h1>
</div>
<select
    name="time frame"
    onChange={e => setTimeFrame(e.target.value)}
>
    <option value={7}>
        Soon (in the next 7 days)
    </option>
    <option value={14}>
        Kind of soon (in the next 14 days)
    </option>
    <option value={30}>
        Not soon (in the next 30 days)
    </option>
</select>

```

To elminate the use of magic numbers in our app, the time frame constants were abstracted out into it's own file. Each constant was named after its category name, and numbers, class names, and display values were stored in each category object.

A helper function to return either the class name or category name were also created to eliminate redundant switch statment based helper functions that were present in the ShoppingListItem component. An updated version of the snippet above shows how this helper function eleminates any guesswork when the timeframeConstants file is imported. The helper function also allows for the flexibility of changing the time frame ranges in the future easily, without having to comb throgh the app to change all the instances of the numbers and associated display strings.

<em>Udpated Snippet from /src/components/AddItemForm.js</em>
```
<div>
    <h1>How soon are you likely to buy it again?</h1>
</div>
<select
    name="time frame"
    onChange={e => setTimeFrame(e.target.value)}
>
    <option value={SOON.integerValue}>
        {returnString("value",SOON.integerValue)}
    </option>
    <option value={KINDOFSOON.integerValue}>
        {returnString("value",KINDOFSOON.integerValue)
    </option>
    <option value={NOTSOON.integerValue}>
        {returnString("value",NOTSOON.integerValue)
    </option>
</select>
```

#### tokenGenerator.js
<em>Provided by [Andrew Hedges](https://github.com/segdeha)</em>

A function to randomly generate a three word token string when a new list is generated by the user.

## User Interface