const { Client } = require('pg');
const express = require('express');
const router = express.Router();

const client = new Client({
  host: '172.31.11.104',
  port: 5432,
  database: 'sdc',
  user: 'yunzhetan',
  password: '19981024tyz'
});

client.connect();

module.exports = client;

