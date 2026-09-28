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