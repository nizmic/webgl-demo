(ns webgl-demo.server
  (:require [noir.server :as server]
            [webgl-demo.logging]
            [webgl-demo.statuses]
            [webgl-demo.views.common]
            [webgl-demo.views.welcome]))

(server/load-views-ns 'webgl-demo.views)

(defn -main [& m]
  (let [mode (keyword (or (first m) :dev))
        port (Integer. (get (System/getenv) "PORT" "8080"))]
    (server/start port {:mode mode
                        :ns 'webgl-demo})))

(def handler (server/gen-handler {:mode :dev
                                  :ns 'webgl-demo}))

