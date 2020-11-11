const express = require('express');

const jasonController = require('../Controllers/jason')
const savvasController = require('../Controllers/savvas')
const miltosController = require('../Controllers/miltos')
const byronController = require('../Controllers/byron')
const generalController = require('../Controllers/general')

const router = express.Router()

//general

router.get('/weekly', generalController.getPercentageByCoupon)

router.get('/october', generalController.getOctober)

router.get('/november', generalController.getNovember)

//jason

router.get('/jason', jasonController.getPercentage)

router.get('/jason/league', jasonController.getLeagueStats)

router.get('/jason/team', jasonController.getTeamStats)

router.get('/jason/weekly', jasonController.getPercentageByCoupon)

//savvas

router.get('/savvas', savvasController.getPercentage)

router.get('/savvas/league', savvasController.getLeagueStats)

router.get('/savvas/team', savvasController.getTeamStats)

router.get('/savvas/weekly', savvasController.getPercentageByCoupon)

//miltos
router.get('/miltos', miltosController.getPercentage)

router.get('/miltos/league', miltosController.getLeagueStats)

router.get('/miltos/team', miltosController.getTeamStats)

router.get('/miltos/weekly', miltosController.getPercentageByCoupon)

//byron
router.get('/byron', byronController.getPercentage)

router.get('/byron/league', byronController.getLeagueStats)

router.get('/byron/team', byronController.getTeamStats)

router.get('/byron/weekly', byronController.getPercentageByCoupon)

module.exports = router