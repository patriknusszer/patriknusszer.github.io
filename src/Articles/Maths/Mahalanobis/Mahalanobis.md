One way of measuring the **unusualness** of a given data point $\vec{x}$ is taking the $\operatorname{L}_2$ norm of the $z$-score vector:

$$
\vec{z} = \frac{\vec{x} - \vec{\pi}_c}{\vec{\sigma}_c}
$$

- $\vec{\pi}_c$ is the mean vector of class $c$, each coordinate being the mean of one of the features/traits
- $\vec{\sigma}_c$ is the standard deviation vector, each coordinate being the standard deviation of one of the features/traits 

Therefore a $z$-score can roughly be thought of as a vector of standardized deviations of different traits from the means. Each deviation $x_i - \pi_{x_i}$ is compared against the respective standard deviation $\sigma_{x_i}$ by division to measure **how many typical deviations is the value from the mean**.

The problem with measuring **unusualness** this way is the fact that the original features might be **correlated**. For example, if two features have great standardized deviations, but it is known they correlate strongly in their direction, then they contribute great **unusualness** but the fact that it was expected due their great correlation is **not discounted**.

The idea is to instead measure **unusualness** of **transformed features that are uncorrelated**. And in particular: can these **transformed features be linear combinations of the original features**?

**Lemma**

The linear combinations of the standardized deviations of the original features with the eigenvectors of covariance matrix of the features yield uncorrelated features, and the variances of these new features are the eigenvalues of the cov. mat.:

$$
\operatorname{Cov}(\vec{z}Q)=\Lambda
$$

**Proof**

The key identity is the following:

$$
\Sigma Q = Q \Lambda
$$

- $\Sigma$ is a matrix, in particular, the covariance matrix of the features in $x$
- $\Lambda$ is a diagonal matrix, in particular, the values in the diagonal are the eigenvalues

$$
\begin{aligned}
\Sigma &=
\begin{bmatrix}
\sigma_{11} & \sigma_{12} & \cdots & \sigma_{1n}\\
\sigma_{21} & \sigma_{22} & \cdots & \sigma_{2n}\\
\vdots      & \vdots      & \ddots & \vdots\\
\sigma_{n1} & \sigma_{n2} & \cdots & \sigma_{nn}
\end{bmatrix}\\
\Lambda &=
\begin{bmatrix}
\lambda_1 &        &        & 0\\
           & \lambda_2 &     &  \\
           &        & \ddots &  \\
0          &        &        & \lambda_n
\end{bmatrix}
\end{aligned}
$$

In generality, this is the eigenvalue problem for multiple eigenvectors and eigenvalues.

After multiplication on the right hand side, the matrix $(Q \Lambda)$ will contain the columns vectors of $Q$ each multiplied by one of the constants of $\Lambda$.

$$
\begin{aligned}

Q &=
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\vec{q_1} & \vec{q_2} & \cdots & \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}\\

Q \Lambda &=
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\lambda_1 \vec{q_1} & \lambda_2 \vec{q_2} & \cdots & \lambda_n \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}
\end{aligned}
$$

And on the left hand side after multiplication, the resulting column vectors of matrix $(\Sigma Q)$ can each be viewed as column vectors of $Q$, each multiplied by $\Sigma$.

$$
\Sigma Q =
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\Sigma \vec{q_1} & \Sigma \vec{q_2} & \cdots & \Sigma \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}
$$

Therefore, for $\forall \vec{q_i} \in Q$ and their corresponding constant $ \Lambda_{ii} \in \Lambda $ the following must hold:

$$
\Sigma \vec{q_i} = \vec{q_i} \Lambda_{ii}
$$

Which is the eigenvalue problem for one eigenvector.
From the above identity we can draw an important conclusion, when $Q$ is invertible.

$$
\begin{aligned}
\Sigma Q &= Q \Lambda\\
\implies Q^{-1}\Sigma Q &= Q^{-1}Q \Lambda = \Lambda
\end{aligned}
$$

$\Sigma$ is a special matrix, because covariance matrices are symmetrical and hence they have exactly $n$ eigenvectors which are orthogonal. And the inverse of square matrices holding orthogonal vectors exist, and it is exactly their transpose:

$$
Q^{-1}=Q^T
$$

The reasoning is trivial. Nondiagonal entries of $(QQ^T)$ are products of different eigenvectors, which are orthogonal, and hence their dot product is zero. While at the diagonal we have the square of the Euclidean $(\operatorname{L}_2)$ length/norm of the eigenvector (which is $1$ if they are chosen to be unit vectors):

$$
QQ^T =
\begin{bmatrix}
q_1^Tq_1 & q_1^Tq_2 & \cdots & q_1^Tq_n \\
q_2^Tq_1 & q_2^Tq_2 & \cdots & q_2^Tq_n \\
\vdots   & \vdots   & \ddots & \vdots   \\
q_n^Tq_1 & q_n^Tq_2 & \cdots & q_n^Tq_n
\end{bmatrix}\\

(QQ^T)_{ij} = q_i^Tq_j =
\begin{cases}
0, & i \ne j
\quad\\[4pt]
\lVert q_i\rVert_2^2, & i=j
\quad
\end{cases}\\
QQ^T =
\begin{bmatrix}
\underbrace{q_1^Tq_1}_{\lVert q_1\rVert_2^2=1}
&
\underbrace{q_1^Tq_2}_{=0}
&
\cdots
&
\underbrace{q_1^Tq_n}_{=0}
\\
\underbrace{q_2^Tq_1}_{=0}
&
\underbrace{q_2^Tq_2}_{\lVert q_2\rVert_2^2=1}
&
\cdots
&
\underbrace{q_2^Tq_n}_{=0}
\\
\vdots & \vdots & \ddots & \vdots
\\
\underbrace{q_n^Tq_1}_{=0}
&
\underbrace{q_n^Tq_2}_{=0}
&
\cdots
&
\underbrace{q_n^Tq_n}_{\lVert q_n\rVert_2^2=1}
\end{bmatrix}
$$

**Theorem**

A symmetrical matrix $A^{nn}$ has exactly $n$ orthogonal eigenvectors.

**Proof**

**Lemma**

A symmetrical matrix $A^{nn}$ has at least one eigenvector.

**Proof**

Consider the following functions:

$$
\begin{aligned}
f(\vec{x}) &= \vec{x}^TA\vec{x}\\
g(\vec{x}) &= \vec{x}^T\vec{x} = 1
\end{aligned}
$$

Where $g$ is an implicitly defined functions which sets a constraint on the set of $\vec{x}$ vectors for which we are finding the maximum of $f$. Simply said, we are looking for the unit vector for which $f$ is maximal:

$$
S=\{\vec{x}∈\mathbb{R}^n : \vec{x}^T\vec{x}=1\}
$$

By the **Topoligical Extreme Value Theorem**:

- If $S$ is a compact (closed and bounded) non-empty topoligical space, here in particular a non-empty metric space such as a subset of $\mathbb{R}^n$
- If $f: S \to \mathbb{R}$ is continuous (everywhere)

Then $f$ attains its maximum at some point $\vec{s} \in S$.

**This is not proven**

The problem is that taking the gradient of $f$ at this point $s$ might not yield the null vector because its definition is insensitive of the constraint.

We define a compound function with a curve function $\vec{x}(t)$ for which:

$$
\begin{aligned}
&g(\vec{x}(t)) = g(x_1(t), x_2(t)...,x_n(t))=y=1\\
\implies &\frac{d}{dt} g(\vec{x}(t)) = 0\\
\text{Let } &\vec{s} = \vec{x}(t^*)\\
\implies &\frac{d}{dt} f(\vec{x}(t))\bigg|_{t=t^*} = 0
\end{aligned}
$$

Applying the multivariable chain rule:

$$
\begin{aligned}
\frac{d}{dt}f(\vec{x}(t))
&=
\frac{d}{dt}f(x_1(t),\ldots,x_n(t))\\
&=
\sum_{i=1}^{n}
\frac{\partial f}{\partial x_i}(\vec{x}(t))\,x_i'(t)\\
&=
\nabla f(\vec{x}(t))^T\vec{x}'(t)\\
\implies
&\nabla f(\vec{x}(t^*))^T\vec{x}'(t^*)=0
\end{aligned}
$$

That means the gradient vector of $f(\vec{x}(t))$ at $t^*$ with the vector of the derivative of the curve function $\vec{x}(t)$ at $t^*$ are perpendicular.

And since $g$ was by definition an implicitly defined function, for at ever point $t$ and hence of course in particular at $t^*$ the derivative with respect to $t$ is:

$$
\begin{aligned}
&\nabla g(\vec{x}(t))^T\vec{x}'(t)=0\\
&\nabla g(\vec{x}(t^*))^T\vec{x}'(t^*)=0
\end{aligned}
$$

Since at $t^*$ both $\nabla g(\vec{x}(t))$ and $\nabla f(\vec{x}(t))$ are perpendicular to $\vec{x}'(t)$, it follows that they must be parallel, that is, scalar multiples of each other.
Writing the result with the Lagrange multiplier $\lambda$ yields:

$$
\nabla g(\vec{x}(t))=\lambda \nabla f(\vec{x}(t))
$$

We are allowed to construct $\vec{x}(t)$ such that $t^*=0$ so $\vec{x}(0)=\vec{s}$
Let's first differentiate $f(x(t))$:

$$
\begin{aligned}
f(x(t))
&=\vec{x}(t)^TA\vec{x}(t)\\
\frac{d}{dt}f(\vec{x}(t))
&=\frac{d}{dt}\left(\vec{x}(t)^TA\vec{x}(t)\right)\\
&=\vec{x}'(t)^TA\vec{x}(t)+\vec{x}(t)^TA\vec{x}'(t)\\
&=\vec{x}'(t)^TA\vec{x}(t)+\left(\vec{x}(t)^TA\vec{x}'(t)\right)^T\\
&=\vec{x}'(t)^TA\vec{x}(t)+\vec{x}'(t)^TA^T\vec{x}(t)\\
\xrightarrow{A=A^T}
&=2\vec{x}'(t)^TA\vec{x}(t)\\
\xrightarrow{\frac{d}{dt} f(\vec{x}(t^*))=0}
&2\vec{x}'(0)^TA\vec{x}(0)=0\\
\xrightarrow{\vec{x}(t^*)=\vec{s}}
&=2\vec{x}'(0)^TA\vec{s}=0.
\end{aligned}
$$


Differentiation of $g(\vec{x}(t))$ is almost the same set aside matrix $A$:

$$
\begin{aligned}
f(x(t))
&=\vec{x}(t)^T\vec{x}(t)\\
\frac{d}{dt}f(\vec{x}(t))
&=\frac{d}{dt}\left(\vec{x}(t)^T\vec{x}(t)\right)\\
&=\vec{x}'(t)^T\vec{x}(t)+\vec{x}(t)^T\vec{x}'(t)\\
&=\vec{x}'(t)^T\vec{x}(t)+\left(\vec{x}(t)^T\vec{x}'(t)\right)^T\\
&=2\vec{x}'(t)^T\vec{x}(t)\\
\xrightarrow{\frac{d}{dt} f(\vec{x}(t^*))=0}
&2\vec{x}'(0)^T\vec{x}(0)=0\\
\xrightarrow{\vec{x}(t^*)=\vec{s}}
&=2\vec{x}'(0)^T\vec{s}=0.
\end{aligned}
$$

Therefore we can conclude what we get with the introduction of the Lagrange multiplier is the eigenvalue problem, and therefore $\vec{s}$ exists and it is an eigenvector of symmetric matrix $A$:

$$
\begin{aligned}
2\vec{x}'(0)^T\vec{s}=0\\
2\vec{x}'(0)^TA\vec{s}=0\\
\implies \vec{s} \perp \vec{x}'(0)\\
\implies A\vec{s} \perp \vec{x}'(0)\\
\implies A\vec{s} = \lambda \vec{s}
\end{aligned}
$$

**Lemma**

If we know a symmetric matrix has at least one eigenvector, there is eactly no more than $n-1$ another orthogonal eigenvectors.

**Proof**

The above maximization problem is repeated, but with vectors perpendicular to all other already found. It would lead to contradiction if there were less than $n$ eigenvectors, because we know that in $\mathbb{R}^n$ every orthogonal basis that can express all the vector space must have exactly $n$ orthogonal vectors. Therefore if we could not extend our collection of less than $n$ orthogonal vectors with one more, that would imply any other vector in $\mathbb{R}^n$ can be expressed with less than $n$ vectors which is not possible. 

**Q.E.D**

**NOTE**
If $f$ was converted into an implicitly defined function $F = f(\vec{x}) - y=0$ with one more variable, and redefining the curvature function $\vec{X}(t)$ as also controlling the extra variable $y$, and taking the derivative of $F$ with respect to $t$ we get the same result for all $t \in \mathbb{R}$:

$$
\nabla F(\vec{X}(t))^T\vec{X}'(t)=0
$$

Which is exactly means for **implicitly defined** surfaces the gradient at any point is perpendicular to every tangent direction at that point.

For **explicitly defined** surfaces, the gradient is the direction of the greatest ascent/increase.

The important conclusion here is, however:

$$
\begin{aligned}
\Sigma Q &= Q \Lambda\\
\implies Q^{-1}\Sigma Q &= Q^{T}\Sigma Q = \Lambda
\end{aligned}
$$

This result is important because the $z$-score transformation by matrix $Q$ yields:

$$
\begin{aligned}
\operatorname{Cov}(zQ)
&=
\mathbb{E}\left[
\left(zQ-\mathbb{E}[zQ]\right)^T
\left(zQ-\mathbb{E}[zQ]\right)
\right]\\
\operatorname{Cov}(zQ)
&=
\mathbb{E}\left[
\left(zQ-\mathbb{E}[zQ]\right)^T
\left(zQ-\mathbb{E}[zQ]\right)
\right]
\\[4pt]
&=
\mathbb{E}\left[
\left(Q^Tz^T-Q^T\mathbb{E}[z]^T\right)
\left(zQ-\mathbb{E}[z]Q\right)
\right]
\\[4pt]
&=
\mathbb{E}\left[
Q^T
\left(z-\mathbb{E}[z]\right)^T
\left(z-\mathbb{E}[z]\right)
Q
\right]
\\[4pt]
&=
Q^T
\mathbb{E}\left[
\left(z-\mathbb{E}[z]\right)^T
\left(z-\mathbb{E}[z]\right)
\right]
Q
\\[4pt]
&=
Q^T\operatorname{Cov}(z)Q\\
&= Q^T \Sigma Q = \Lambda
\end{aligned}
$$

Therefore, the transformed data has diagonal covariance matrix, hence the new features, formed by linear combinations of the original features are **uncorrelated**. So the idea is, instead of measuring unusualness of original data, instead, **measure unusualness of the transformed data which is uncorrelated**, by calculating the L2 norm of $\vec{z}Q$ which is:

$$
\operatorname{L}_2(\vec{z}Q) =\sqrt{ \sum_{i=1}^{n} \left(\frac{z_i \vec{q_i}}{\lambda_i}\right)^2}
$$

If eigenvectors of $Q$ are chosen to be unit vectors, then $Q$ is a *rotational* matrix, that is, it preserves Euclidean properties but it is important to note **it is not in fact required to measure Mahalanobis distance**. The eigenvectors can have arbitrary $L_2$ lengths but then the variances in the diagonal of $\Lambda$ are scaled by the respective squares of the $L_2$ lengths of their corresponding eigenvectors, and hence the Mahalanobis distance needs to be adjusted as:

$$
\begin{aligned}
\operatorname{L}_2(\vec{z}Q) &=\sqrt{ \sum_{i=1}^{n} \left(\frac{z_i \hat{q_i}\lVert \vec{q_i} \rVert_2^2}{\Lambda_{ii}}\right)^2}\\
\Lambda_{ii} &= \lVert \vec{q_i} \rVert_2^2 \lambda_i
\end{aligned}
$$

In generative LDA, the Mahalanobis distance is exponentially weighted to measure the probability of the data point $x$ belonging to a class $c$.

Formally, assuming data has normal distribution:

$$

\operatorname{p}(\vec{x}\mid c)
=
\frac{1}{(2\pi)^{n/2}\mid\Sigma\mid^{1/2}}
\exp\left(
-\frac12
(\vec{x}-\vec{\mu}_c)^T
\Sigma^{-1}
(\vec{x}-\vec{\mu}_c)
\right).
$$

Where $
(\vec{x}-\vec{\mu}_c)^T
\Sigma^{-1}
(\vec{x}-\vec{\mu}_c)$ is the Mahalanobis distance.