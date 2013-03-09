(ns webgl-demo.statuses
  (:require [noir.statuses :as statuses]))

(statuses/set-page! 404 "404 Not Found")
