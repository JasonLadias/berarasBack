const { result } = require('lodash')
let sql = require('../Mysql/MySQLconf')

exports.getPercentageByCoupon = (req,res,next) => {
  sql.query(`SELECT j.id, j.date, wonJason, playedJason, wonSavvas, playedSavvas, wonMiltos, playedMiltos, wonByron, playedByron FROM
  ((SELECT c.id, c.date , sum(result) as wonJason, count(result) as playedJason FROM coupons as c INNER JOIN bets as b on c.id = b.couponid
  where b.userid = 1 
  group by c.id) as j
  LEFT JOIN 
  (SELECT c.id, c.date , sum(result) as wonSavvas, count(result) as playedSavvas FROM coupons as c INNER JOIN bets as b on c.id = b.couponid
  where b.userid = 2 
  group by c.id) as s
  on j.id = s.id) 
  LEFT JOIN
  (SELECT c.id, c.date , sum(result) as wonMiltos, count(result) as playedMiltos FROM coupons as c INNER JOIN bets as b on c.id = b.couponid
  where b.userid = 3 
  group by c.id) as m
  on m.id = j.id
  LEFT JOIN
  (SELECT c.id, c.date , sum(result) as wonByron, count(result) as playedByron FROM coupons as c INNER JOIN bets as b on c.id = b.couponid
  where b.userid = 4 
  group by c.id) as b
  on b.id = j.id`, (err, result)=>{
    if(err){
      res.send(JSON.stringify({error : 'true'}))
      return
    }
    res.send(JSON.stringify(result))
  })
}

exports.getOctober = (req,res,next) => {
  sql.query(`SELECT * FROM
  (SELECT b.userid, sum(b.result) won, count(b.result) played, sum(b.result)/count(b.result)*100 percentage 
  FROM bets b INNER JOIN coupons c ON b.couponid = c.id where month(c.date) = 10 or month(c.date) = 09 group by b.userid
  ) per
  INNER JOIN users ON per.userid = users.id_user order by percentage ;`, (err, result)=>{
    if(err){
      res.send(JSON.stringify({error : 'true'}))
      return
    }
    res.send(JSON.stringify(result))
  })
}

exports.getNovember = (req,res,next) => {
  sql.query(`SELECT * FROM
  (SELECT b.userid, sum(b.result) won, count(b.result) played, sum(b.result)/count(b.result)*100 percentage 
  FROM bets b INNER JOIN coupons c ON b.couponid = c.id where month(c.date) = 11 group by b.userid
  ) per
  INNER JOIN users ON per.userid = users.id_user order by percentage ;`, (err, result)=>{
    if(err){
      res.send(JSON.stringify({error : 'true'}))
      return
    }
    res.send(JSON.stringify(result))
  })
}

