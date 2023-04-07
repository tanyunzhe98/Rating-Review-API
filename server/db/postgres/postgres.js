const { Client } = require('pg');
const express = require('express');
const router = express.Router();
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'sdc',
  password: '19981024tyz'
});

client.connect();

module.exports = client;

