import React from 'react'
import './main.css'
import hero from '../media/content/hero-illustration.png'
import editor from '../media/content/editor.png'
import sketch from '../media/content/sketch.png'
import { Link } from 'react-router-dom'

export default function Home({isLoggedIn}) {
    return (

        <div>
            <main>

                <section class="bg-image-hero center-tablet dark overlay-hero">
                    <div class="full-screen -margin-bottom middle padding padding-top-tablet">
                        <div class="row max-width-l">
                            <div class="col-one-half middle">
                                <div>
                                    <h1 class="hero">QuickCode</h1>
                                    <p class="lead">Limitation of hardware should not be the barrier while learning</p>
                                    {
                                        isLoggedIn===true ?
                                        <Link to='/register'  class="button button-primary space-top" role="button">Get Started</Link>
                                        : <Link to='/editor'  class="button button-primary space-top" role="button">Editor</Link>
                                    }
                                </div>
                            </div>
                            <div class="col-one-half middle">
                                <img src={hero} alt="Hero Illustration" />
                            </div>
                        </div>
                    </div>
                    <div class="padding">
                        <div class="row margin-bottom max-width-l">
                            <div class="col-one-half middle">
                                <h3>Code Editor</h3>
                                <p class="paragraph">Minimal Code Editor design for mobile users, with upto 8 languages to learn</p>
                            </div>
                            <div class="col-one-half">
                                <img class="rounded shadow-l" src={editor} alt="Editor" />
                            </div>
                        </div>
                        <div class="row max-width-l reverse-order">
                            <div class="col-one-half">
                                <img class="rounded shadow-l" src={sketch} alt="Sketch" />
                            </div>
                            <div class="col-one-half middle">
                                <h3>Notes</h3>
                                <p class="paragraph">Specially designed to take short notes while learning and practicing</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer class="footer-main bg-gradient-primary dark overlay-shape-06">
                <div class="padding">
                    <div class="center margin-bottom max-width-m">
                        <h3>Kick start your programming journey</h3>
                        <p class="paragraph">Try QuickCode, So you can focus on your important skills</p>
                    </div>
                </div>
                <p class="copyright"><span>Team Gladiators</span><span> - © 2021</span></p>
            </footer>

        </div>

    )
}
