[![Netlify Status](https://api.netlify.com/api/v1/badges/5a89f402-2b1f-44ed-a723-07b7cbacd75f/deploy-status)](https://app.netlify.com/sites/tcl-5-smart-shopping-list/deploys)

# Overview

The goal of this project is to create a “smart” shopping list app that learns your buying habits and helps you remember what you’re likely to need to buy on your next trip to the store.

How it works is that you will enter items (e.g., “Greek yogurt” or “Paper towels”) into your list. Each time you buy the item, you mark it as purchased in the list. Over time, the app comes to understand the intervals at which you buy different items. If an item is likely to be due to be bought soon, it rises to the top of the shopping list.

The app will work in many of the same ways as [iNeedToBuy.xyz](https://app.ineedtobuy.xyz/) (on which our project is based) with the exception that we will not be implementing barcode scanning (that feature would add a lot of scope to the project and in my experience wasn’t all that useful).

For additional details, please check out the [project brief](PROJECT-BRIEF.md).

<hr>

# Quick Links
- [Team Members](#team-members)
- [Project Tools](#project-tools)
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

#### tokenGenerator.js
<em>Provided by [Andrew Hedges](https://github.com/segdeha)</em>

## User Interface