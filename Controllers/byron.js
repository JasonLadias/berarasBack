const { result } = require('lodash')
let sql = require('../Mysql/MySQLconf')

exports.getPercentage = (req,res,next) => {
  sql.query('SELECT sum(result)/count(result)*100 as percentage FROM betaras.bets where userid = 4', (err, result)=>{
    if(err){
      res.send(JSON.stringify({error : 'true'}))
      return
    }
    res.send(JSON.stringify(result))
  })
}


exports.getLeagueStats = (req,res,next) => {
  sql.query(`SELECT * FROM ( 
    SELECT league, sum(result)/count(result) as percentage, count(result) as played, sum(result) as won  
    FROM betaras.bets where userid=4 group by league 
    ) as first
    WHERE played > 1 order by percentage`, (err, result)=>{
    if(err){
      res.send(JSON.stringify({error : 'true'}))
      return
    }
    res.send(JSON.stringify(result))
  })
}

exports.getTeamStats = (req,res,next) => {
  sql.query(`SELECT * FROM
  (
  SELECT team, sum(won) as totalWins, sum(won)/sum(cnt) as percentage, sum(cnt) as cnt FROM
  (
  SELECT home as team, sum(result) as won, count(result) as cnt FROM betaras.bets Where userid=4 group by home
  UNION ALL
  SELECT away as team, sum(result) as won, count(result) as cnt FROM betaras.bets Where userid=4 group by away
  ) as con
  group by team
  ) as lasttable 
  where cnt > 1
  order by percentage`, (err, result)=>{
    if(err){
      res.send(JSON.stringify({error : 'true'}))
      return
    }
    res.send(JSON.stringify(result))
  })
}

exports.getPercentageByCoupon = (req,res,next) => {
  sql.query(`SELECT c.id, sum(result) as won, count(result) as played FROM coupons as c INNER JOIN bets as b on c.id = b.couponid
  where b.userid = 4 
  group by c.id`, (err, result)=>{
    if(err){
      res.send(JSON.stringify({error : 'true'}))
      return
    }
    res.send(JSON.stringify(result))
  })
}