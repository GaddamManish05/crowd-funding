import React from "react";
import { styles } from "../styles/common";
import { Link } from "react-router";

function Home() {
  return (
    <main>

      {/* Hero Section */}

      <section className={styles.heroSection}>
        <div className="max-w-4xl mx-auto text-center px-6">

          <h1 className={styles.headingXL}>
            Fund Ideas That Matter
          </h1>

          <p className={`${styles.paragraph} mt-6`}>
            Discover innovative campaigns and help bring meaningful
            ideas to life. Start a campaign or support creators today.
          </p>

          <div className="flex justify-center gap-4 mt-8">

            <Link
              to="/sign-up"
              className={styles.primaryButton}
            >
              Start a Campaign
            </Link>

            <Link
              to="/login"
              className={styles.secondaryButton}
            >
              Explore Campaigns
            </Link>

          </div>

        </div>
      </section>

      {/* Featured Campaigns */}

      <section className={styles.campaignSection}>
        <div className={styles.container}>

          <h2 className={`${styles.headingLG} text-center`}>
            Featured Campaigns
          </h2>

          <div className={`${styles.grid3} mt-12`}>

            {/* Example Cards */}

            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.card}>

                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                  alt="campaign"
                  className={styles.cardImage}
                />

                <div className={styles.cardContent}>

                  <h3 className={styles.cardTitle}>
                    Innovative Tech Project
                  </h3>

                  <p className={styles.cardDescription}>
                    Help build the next generation of AI powered tools
                    for developers.
                  </p>

                  <div className="mt-4">

                    <div className={styles.progressBarContainer}>
                      <div
                        className={styles.progressBar}
                        style={{ width: "60%" }}
                      />
                    </div>

                    <p className={`${styles.smallText} mt-2`}>
                      ₹60,000 raised of ₹100,000
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* How It Works */}

      <section className="py-24 bg-[#f5f5f7]">

        <div className={styles.container}>

          <h2 className={`${styles.headingLG} text-center`}>
            How It Works
          </h2>

          <div className={`${styles.grid3} mt-16`}>

            <div className="text-center">
              <h3 className={styles.headingMD}>Create Campaign</h3>
              <p className={`${styles.paragraph} mt-3`}>
                Share your idea and set your fundraising goal.
              </p>
            </div>

            <div className="text-center">
              <h3 className={styles.headingMD}>Get Support</h3>
              <p className={`${styles.paragraph} mt-3`}>
                Reach supporters and grow your community.
              </p>
            </div>

            <div className="text-center">
              <h3 className={styles.headingMD}>Make Impact</h3>
              <p className={`${styles.paragraph} mt-3`}>
                Turn your ideas into reality with funding.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Call To Action */}

      <section className="py-24 text-center">

        <h2 className={styles.headingLG}>
          Ready to Launch Your Idea?
        </h2>

        <p className={`${styles.paragraph} mt-4`}>
          Join thousands of creators building the future.
        </p>

        <div className="mt-8">
          <Link
            to="/sign-up"
            className={styles.primaryButton}
          >
            Start Your Campaign
          </Link>
        </div>

      </section>

    </main>
  );
}

export default Home;