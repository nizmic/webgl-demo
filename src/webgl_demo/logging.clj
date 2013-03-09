(ns webgl-demo.logging
  (:use [clojure.tools.logging :only [error info]]
        [clj-logging-config.log4j]))

(set-logger! "webgl-demo"
             :pattern "%d %-5p %c: %m%n")
